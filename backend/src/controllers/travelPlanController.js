/**
 * <https://www.npmjs.com/package/@types/google.maps>
 */
import prisma from "../services/dbService.js";

// THIS IS THE TRAVEL PLAN CONTROLLER --------------------------------------------------------------------------------------------------------------------------------------------------------

function formatTravelPlans(travelPlans) {
  const formattedTravelPlans = travelPlans.map((plan) => {
    // ดึงรูปภาพจาก destination แรก (ถ้ามี)
    let photoUrl = null;
    if (
      plan.destinations &&
      plan.destinations.length > 0 &&
      plan.destinations[0].photoUrl
    ) {
      photoUrl = plan.destinations[0].photoUrl;
    }

    return {
      id: plan.id,
      title: plan.title,
      cityTitle: plan.cityTitle,
      startDate: plan.startDate,
      endDate: plan.endDate,
      visibility: plan.visibility,
      totalLike: plan.likedByUsers.length, // นับจำนวนไลค์
      photoUrl: photoUrl, // เพิ่ม photoUrl
      user: {
        id: plan.user.id,
        username: plan.user.username,
      },
    };
  });
  
  return formattedTravelPlans;
}

//create travel plan
export const createTravelPlan = async (req, res) => {
  try {
    // ตรวจสอบว่ามี session และมีข้อมูลผู้ใช้หรือไม่
    if (!req.session || !req.session.user || !req.session.user.id) {
      return res.status(401).json({
        status: "error",
        message: "Not authenticated. Please log in.",
      });
    }

    const authorId = req.session.user.id;
    const {
      title,
      cityTitle,
      notes,
      startDate,
      endDate,
      visibility,
      itinerary,
    } = req.body;

    if (
      !title ||
      !cityTitle ||
      !startDate ||
      !endDate ||
      !visibility
    ) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in all the required fields.",
      });
    }

    // แปลงวันที่เป็น Date object หากจำเป็น
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // สร้าง travel plan
    const newTravelPlan = await prisma.travelPlan.create({
      data: {
        title: title,
        authorId: authorId,
        cityTitle: cityTitle,
        notes: notes,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        visibility: visibility,
      },
    });

    // ถ้ามีข้อมูล destinations ให้บันทึกลงใน TravelPlanDestination
    if (!itinerary.length) {
      console.log(
        `WARN: The TravelPlan ${newTravelPlan.id} contains empty itinerary`
      );

      return res.status(201).json({
        status: "success",
        message: "TravelPlan created successfully with no itinerary",
        data: newTravelPlan,
      });
    }

    const addedDestinationIdList = [];

    // ใช้ Promise.all เพื่อรอให้การทำงานทั้งหมดเสร็จสิ้น
    const createDestinationsPromises = [];
    
    // วนลูปแต่ละวัน
    for (const day of itinerary) {
      console.log("Processing day:", day);
      
      // วนลูปแต่ละสถานที่ในวันนั้น
      for (let placeIndex = 0; placeIndex < day.places.length; placeIndex++) {
        const place = day.places[placeIndex];
        console.log(`Processing the #${placeIndex} place:`, place);
        
        // สร้าง Promise สำหรับการสร้างสถานที่และ notes
        const createDestinationPromise = async () => {
          try {
            // สร้างสถานที่
            const newTravelPlanDestination = await prisma.travelPlanDestination.create({
              data: {
                travelPlanId: newTravelPlan.id,
                title: place.title,
                latitude: place.latitude,
                longitude: place.longitude,
                photoUrl: place.photoUrl,
                googlePlaceId: place.googlePlaceId,
                startDate: new Date(day.startDate),
                dailyVisitOrder: placeIndex,
              },
            });
            
            console.log("New destination added: ", newTravelPlanDestination.id);
            addedDestinationIdList.push(newTravelPlanDestination.id);
            
            // เพิ่ม place note ถ้ามี
            if (place.notes) {
              await prisma.placeNote.create({
                data: {
                  travelPlanId: newTravelPlan.id,
                  placeId: place.googlePlaceId,
                  notes: place.notes
                }
              });
              console.log(`Added notes for place: ${place.title}`);
            }
            
            return newTravelPlanDestination;
          } catch (error) {
            console.error(`Error creating destination: ${error.message}`);
            // ถ้าเกิดข้อผิดพลาด ให้ลบสถานที่ที่สร้างไปแล้ว
            if (addedDestinationIdList.length > 0) {
              await prisma.travelPlanDestination.deleteMany({
                where: {
                  id: { in: addedDestinationIdList },
                },
              });
            }
            throw error;
          }
        };
        
        createDestinationsPromises.push(createDestinationPromise());
      }
    }
    
    // รอให้การสร้างสถานที่และ notes ทั้งหมดเสร็จสิ้น
    await Promise.all(createDestinationsPromises);

    return res.status(201).json({
      status: "success",
      message: "Travel plan created successfully",
      data: newTravelPlan,
    });
  } catch (error) {
    console.error("Error creating travel plan:", error);

    return res.status(500).json({
      status: "error",
      message: "Failed to create travel plan",
      error: error.message,
    });
  }
};

//get all travel plans
export const getAllTravelPlans = async (req, res) => {
  const whereClause = {};
  const query = req.query;

  if (query) {
    if (query.author_id) {
      console.log(query);
      whereClause.authorId = parseInt(req.query.author_id);
    }
  }

  try {
    const travelPlans = await prisma.travelPlan.findMany({
      where: {
        visibility: "PUBLIC", // เพิ่มเงื่อนไขให้ดึงเฉพาะแผนที่เป็น PUBLIC
        ...whereClause,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        likedByUsers: {
          select: {
            userId: true,
          },
        },
        bookmarkedByUsers: {
          select: {
            userId: true,
          },
        },
        destinations: {
          select: {
            id: true,
            photoUrl: true,
          },
          // take: 1, // เอาแค่ destination แรก
        },
      },
    });

    // แปลง likedByUsers เป็นรูปแบบที่ต้องการก่อนส่งไปยังฟังก์ชัน formatTravelPlans
    const plansWithFormattedLikes = travelPlans.map(plan => {
      const formattedPlan = {...plan};
      formattedPlan.likedByUsers = plan.likedByUsers.map(user => user.userId);
      return formattedPlan;
    });
    
    // ใช้ฟังก์ชัน formatTravelPlans ที่มีอยู่แล้ว
    const formattedTravelPlans = formatTravelPlans(plansWithFormattedLikes);

    res.status(200).json({
      status: "success",
      data: formattedTravelPlans,
    });
  } catch (error) {
    console.error("Error getting all travel plans:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to get all travel plans",
      error: error.message,
    });
  }
};

//get travel plan by id
export const getTravelPlanById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const travelPlan = await prisma.travelPlan.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true, // เพิ่ม avatarUrl เพื่อแสดงรูปโปรไฟล์ของผู้ใช้
          },
        },
        likedByUsers: {
          select: {
            userId: true,
          },
        },
        bookmarkedByUsers: {
          select: {
            userId: true,
          },
        },
        destinations: {
          include: {
            attachments: true, // เพิ่มการดึงข้อมูลรูปภาพเพิ่มเติมของแต่ละสถานที่
          },
          orderBy: [
            { startDate: 'asc' },
            { dailyVisitOrder: 'asc' }
          ],
        },
        placeNotes: true,
      },
    });

    if (!travelPlan) {
      return res.status(404).json({
        status: "error",
        message: "Travel plan not found",
      });
    }

    // ดึงรูปภาพจาก destination แรก (ถ้ามี)
    let photoUrl = null;
    if (
      travelPlan.destinations &&
      travelPlan.destinations.length > 0 &&
      travelPlan.destinations[0].photoUrl
    ) {
      photoUrl = travelPlan.destinations[0].photoUrl;
    }

    const itinerary = Object.entries(
      travelPlan.destinations.reduce((dayIndex, destination) => {
        const date = new Date(destination.startDate)
          .toISOString()
          .split("T")[0]; // Format date as YYYY-MM-DD
        if (!dayIndex[date]) {
          dayIndex[date] = [];
        }
        dayIndex[date].push({
          title: destination.title,
          latitude: destination.latitude,
          longitude: destination.longitude,
          photoUrl: destination.photoUrl,
          googlePlaceId: destination.googlePlaceId,
          startDate: destination.startDate,
          dailyVisitOrder: destination.dailyVisitOrder,
        });
        return dayIndex;
      }, {})
    ).map(([date, places]) => ({
      startDate: date,
      places: places.sort((a, b) => a.dailyVisitOrder - b.dailyVisitOrder), // Sort places by dailyVisitOrder
    }));

    travelPlan.likedByUsers = travelPlan.likedByUsers.map(user => user.userId);

    const formattedTravelPlan = {
      id: travelPlan.id,
      title: travelPlan.title,
      cityTitle: travelPlan.cityTitle,
      startDate: travelPlan.startDate,
      endDate: travelPlan.endDate,
      visibility: travelPlan.visibility,
      itinerary: itinerary,
      totalLike: travelPlan.likedByUsers.length, // นับจำนวนไลค์
      likedByUsers: travelPlan.likedByUsers,
      bookmarkedByUsers: travelPlan.bookmarkedByUsers,
      photoUrl: photoUrl, // เพิ่ม photoUrl
      placeNotes: travelPlan.placeNotes, // เพิ่มข้อมูล placeNotes เพื่อส่งกลับไปยัง Frontend
      user: {
        id: travelPlan.user.id,
        username: travelPlan.user.username,
        avatarUrl: travelPlan.user.avatarUrl, // เพิ่ม avatarUrl ของผู้ใช้
      },
    };

    console.log("formattedTravelPlan: ", formattedTravelPlan);

    res.status(200).json({
      status: "success",
      data: formattedTravelPlan,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get travel plan by id",
      error: error.message,
    });
  }
};

export const updateTravelPlan = async (req, res) => {
  try {
    const travelPlan = await prisma.travelPlan.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const authorId = travelPlan.authorId;
    const travelPlanId = req.params.id;
    const {
      newTitle,
      newCityTitle,
      newNotes,
      newStartDate,
      newEndDate,
      newVisibility,
    } = req.body;

    const travelPlanIdInt = parseInt(travelPlanId);
    const newStartDateType = new Date(newStartDate);
    const newEndDateType = new Date(newEndDate);

    // console.log("newStartDateType: ", newStartDateType);
    // console.log("newEndDateType: ", newEndDateType);

    if (authorId !== req.session.user.id) {
      return res.status(403).json({
        status: "error",
        message: "You don't have permission to update this travel plan",
      });
    }

    if (!travelPlanId) {
      return res.status(400).json({
        status: "error",
        message: "Travel plan ID not provided",
      });
    }

    const existingTravelPlan = await prisma.travelPlan.findUnique({
      where: { id: travelPlanIdInt },
    });

    if (!existingTravelPlan) {
      return res.status(404).json({
        status: "error",
        message: "Travel plan not found",
      });
    }

    const updateData = {};
    if (newTitle) updateData.title = newTitle;
    if (newCityTitle) updateData.cityTitle = newCityTitle;
    if (newNotes) updateData.notes = newNotes;
    if (newStartDate) updateData.startDate = newStartDateType;
    if (newEndDate) updateData.endDate = newEndDateType;
    if (newVisibility) updateData.visibility = newVisibility;

    if (!newTitle) {
      updateData.title = existingTravelPlan.title;
    }
    if (!newCityTitle) {
      updateData.cityTitle = existingTravelPlan.cityTitle;
    }
    if (!newNotes) {
      updateData.notes = existingTravelPlan.notes;
    }
    if (!newStartDate) {
      updateData.startDate = existingTravelPlan.startDate;
    }
    if (!newEndDate) {
      updateData.endDate = existingTravelPlan.endDate;
    }
    if (!newVisibility) {
      updateData.visibility = existingTravelPlan.visibility;
    }
    // ถ้า Edit วัน วันที่มีการนําออกไป ข้อมูลใน TravelPlanDestination จะต้องถูกลบออกไป

    const travelPlanUpdated = await prisma.travelPlan.update({
      where: {
        id: travelPlanIdInt,
      },
      data: updateData,
      select: {
        id: true,
        title: true,
        cityTitle: true,
        notes: true,
        startDate: true,
        endDate: true,
        visibility: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Travel plan updated successfully",
      data: travelPlanUpdated,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update travel plan",
      error: error.message,
    });
  }
};

export const deleteTravelPlan = async (req, res) => {
  try {
    const travelPlanId = parseInt(req.params.id);
    const authorId = travelPlanId.authorId;
    if (authorId !== req.session.user.id) {
      return res.status(403).json({
        status: "error",
        message: "You don't have permission to delete this travel plan",
      });
    }

    await prisma.travelPlan.delete({
      where: {
        id: travelPlanId,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Travel plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete travel plan",
      error: error.message,
    });
  }
};

// THIS IS THE JOURNAL CONTROLLER --------------------------------------------------------------------------------------------------------------------------------------------------------

export const createJournal = async (req, res) => {
  try {
    console.log("Received journal creation request");
    
    // ตรวจสอบว่ามีการส่งข้อมูลมาในรูปแบบ FormData หรือ JSON
    let notes, futureTip, favNotes, rating, photoAttachments, placeNotes;
    
    // ดึงข้อมูลจาก request body
    notes = req.body.notes;
    futureTip = req.body.futureTip;
    favNotes = req.body.favNotes;
    rating = req.body.rating;
    
    // ตรวจสอบว่ามีการส่ง placeNotes มาหรือไม่
    if (req.body.placeNotes) {
      // ถ้าส่งมาเป็น string (JSON) ให้แปลงเป็น object
      if (typeof req.body.placeNotes === 'string') {
        try {
          placeNotes = JSON.parse(req.body.placeNotes);
        } catch (error) {
          console.error("Error parsing placeNotes JSON:", error);
          placeNotes = [];
        }
      } else {
        placeNotes = req.body.placeNotes;
      }
    } else {
      placeNotes = [];
    }
    let photoMetadata = [];
    if (req.body.photoMetadata) {
      try {
        photoMetadata = JSON.parse(req.body.photoMetadata);
        console.log("Received photo metadata:", photoMetadata);
      } catch (error) {
        console.error("Error parsing photoMetadata JSON:", error);
      }
    }
    

    photoAttachments = [];
    if (req.files && req.files.length > 0) {
      console.log(`Received ${req.files.length} files:`, req.files.map(f => f.originalname).join(', '));
      
      // ตรวจสอบว่ามี metadata หรือไม่
      if (photoMetadata.length > 0) {
        // ถ้ามี metadata ให้ใช้ข้อมูลจาก metadata
        req.files.forEach((file, index) => {
          // หา metadata ที่ตรงกับ index ของไฟล์
          // ใช้ fileIndex ที่ส่งมาจาก frontend หรือใช้ index ปัจจุบันถ้าไม่พบ
          const metadata = photoMetadata.find(m => m.fileIndex === index) || photoMetadata[index];
          
          if (metadata) {
            // สร้าง URL สำหรับไฟล์
            const fileName = file.filename || `${Date.now()}_${index}_${file.originalname}`;
            const filePath = `/uploads/images/${fileName}`;
            
            console.log(`Processing file ${index}: ${fileName} for placeId: ${metadata.placeId}`);
            
            photoAttachments.push({
              placeId: metadata.placeId,
              photoUrl: filePath,
              order: metadata.order || index
            });
          } else {
            console.warn(`No metadata found for file at index ${index}`);
            // ถ้าไม่พบ metadata แต่มี destination ให้ใช้ destination แรก
            if (travelPlan && travelPlan.destinations && travelPlan.destinations.length > 0) {
              const firstDestination = travelPlan.destinations[0];
              const fileName = file.filename || `${Date.now()}_${index}_${file.originalname}`;
              const filePath = `/uploads/images/${fileName}`;
              
              photoAttachments.push({
                placeId: firstDestination.id,
                photoUrl: filePath,
                order: index
              });
            }
          }
        });
      } else {
        // ถ้าไม่มี metadata ให้ใช้ข้อมูลจาก travelPlan
        if (travelPlan && travelPlan.destinations && travelPlan.destinations.length > 0) {
          // ใช้ destination แรกเป็นค่าเริ่มต้น
          const firstDestination = travelPlan.destinations[0];
          
          req.files.forEach((file, index) => {
            // ใช้ชื่อไฟล์ที่ multer กำหนดหรือสร้างชื่อไฟล์ใหม่
            const fileName = file.filename || `${Date.now()}_${index}_${file.originalname}`;
            const filePath = `/uploads/images/${fileName}`;
            
            console.log(`Processing file ${index}: ${fileName} for default placeId: ${firstDestination.id}`);
            
            photoAttachments.push({
              placeId: firstDestination.id,
              photoUrl: filePath,
              order: index
            });
          });
        } else {
          console.warn("No destinations found in travel plan for attaching photos");
        }
      }
    } else if (req.body.photoAttachments) {
  
      if (typeof req.body.photoAttachments === 'string') {
        try {
          photoAttachments = JSON.parse(req.body.photoAttachments);
        } catch (error) {
          console.error("Error parsing photoAttachments JSON:", error);
          photoAttachments = [];
        }
      } else {
        photoAttachments = req.body.photoAttachments;
      }
    }
    
    console.log("Processed request data:", { 
      notes, 
      futureTip, 
      favNotes, 
      rating,
      placeNotesCount: placeNotes.length,
      photoAttachmentsCount: photoAttachments.length
    });
    
    const travelPlanId = req.params.id;


    const userId = req.session.user?.id;
    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Not authenticated. Please log in.",
      });
    }

    
    const travelPlan = await prisma.travelPlan.findUnique({
      where: {
        id: parseInt(travelPlanId),
      },
      include: {
        destinations: true,
      },
    });

    if (!travelPlan) {
      return res.status(404).json({
        status: "error",
        message: "Travel plan not found",
      });
    }

    // ตรวจสอบว่า user ที่ login เป็นเจ้าของ travel plan หรือไม่
    if (travelPlan.authorId !== userId) {
      return res.status(403).json({
        status: "error",
        message:
          "You are not authorized to create a journal for this travel plan",
      });
    }

    const ratingInt = parseInt(rating);
    if (ratingInt < 0 || ratingInt > 5) {
      return res.status(400).json({
        status: "error",
        message: "Rating must be between 0 and 5",
      });
    }

    if (!notes) {
      return res.status(400).json({
        status: "error",
        message: "Notes are required",
      });
    }

    if (!favNotes) {
      return res.status(400).json({
        status: "error",
        message: "Mood is required",
      });
    }
    if (!futureTip) {
      return res.status(400).json({
        status: "error",
        message: "Future tip is required",
      });
    }

    if (!travelPlanId) {
      return res.status(400).json({
        status: "error",
        message: "Travel plan ID not provided",
      });
    }
    if (!ratingInt) {
      return res.status(400).json({
        status: "error",
        message: "Rating is required",
      });
    }

    // สร้าง journal ก่อน
    const journal = await prisma.travelPlanJournal.create({
      data: {
        travelPlanId: parseInt(travelPlanId),
        notes: notes,
        futureTip: futureTip,
        favNotes: favNotes,
        rating: ratingInt,
      },
    });

    if (placeNotes && Array.isArray(placeNotes) && placeNotes.length > 0) {
      const placeNotesToCreate = [];
      
      for (const note of placeNotes) {
        if (note.placeId && note.notes && note.notes.trim() !== "") {
          placeNotesToCreate.push({
            journalId: journal.id,
            placeId: note.placeId.toString(),
            notes: note.notes
          });
        }
      }
      
      if (placeNotesToCreate.length > 0) {
        await prisma.journalPlaceNote.createMany({
          data: placeNotesToCreate
        });
      }
    }

    // บันทึกรูปภาพลงใน TravelPlanDestinationAttachment
    if (
      photoAttachments &&
      Array.isArray(photoAttachments) &&
      photoAttachments.length > 0
    ) {
      console.log("Processing photo attachments:", JSON.stringify(photoAttachments));
      
      // สร้าง array สำหรับเก็บข้อมูลที่จะบันทึกลงใน TravelPlanDestinationAttachment
      const attachmentsToCreate = [];

      // วนลูปผ่านรูปภาพที่ส่งมา
      for (const attachment of photoAttachments) {
        console.log("Processing attachment:", JSON.stringify(attachment));
        
        if (!attachment.placeId) {
          console.error("Missing placeId in attachment");
          continue;
        }
        
        if (!attachment.photoUrl) {
          console.error("Missing photoUrl in attachment");
          continue;
        }
        
        // แสดงข้อมูล destinations ทั้งหมดเพื่อการตรวจสอบ
        console.log("Available destinations:", JSON.stringify(travelPlan.destinations.map(d => ({ 
          id: d.id, 
          googlePlaceId: d.googlePlaceId,
          title: d.title 
        }))));
        
        // หา destination ID จาก placeId ที่ส่งมา
        const placeIdStr = attachment.placeId.toString();
        console.log("Looking for destination with placeId:", placeIdStr);
        
        const destination = travelPlan.destinations.find(
          (dest) => {
            const destId = dest.id;
            const googleId = dest.googlePlaceId;
            console.log(`Comparing: dest.id=${destId}, dest.googlePlaceId=${googleId} with attachment.placeId=${placeIdStr}`);
            return destId == placeIdStr || googleId === placeIdStr;
          }
        );

        if (destination) {
          console.log("Found matching destination:", destination.id, destination.title);
          
          // ตรวจสอบว่ามี attachment สำหรับ destination นี้อยู่แล้วหรือไม่
          const existingAttachmentCount =
            await prisma.travelPlanDestinationAttachment.count({
              where: {
                travelPlanDestinationId: destination.id,
              },
            });

          console.log(`Existing attachment count for destination ${destination.id}: ${existingAttachmentCount}`);

          const order = attachment.order !== undefined ? 
            attachment.order : 
            existingAttachmentCount + 1;

          attachmentsToCreate.push({
            travelPlanDestinationId: destination.id,
            url: attachment.photoUrl,
            order: order
          });
          
          console.log("Added to attachmentsToCreate:", {
            travelPlanDestinationId: destination.id,
            url: attachment.photoUrl,
            order: order
          });
        } else {
          console.error(`No matching destination found for placeId: ${placeIdStr}`);
        }
      }

      if (attachmentsToCreate.length > 0) {
        console.log("Creating attachments:", JSON.stringify(attachmentsToCreate));
        await prisma.travelPlanDestinationAttachment.createMany({
          data: attachmentsToCreate,
        });
        console.log("Successfully created attachments");
      } else {
        console.warn("No attachments to create after processing");
      }
    } else {
      console.log("No photo attachments provided or invalid format");
    }

    // ดึงข้อมูล journal ที่สร้างพร้อมกับ place notes และ attachments
    const createdJournal = await prisma.travelPlanJournal.findUnique({
      where: {
        id: journal.id
      },
      include: {
        placeNotes: true,
        travelPlan: {
          include: {
            destinations: {
              include: {
                attachments: true
              }
            }
          }
        }
      }
    });

    console.log("Returning journal with data:", JSON.stringify({
      id: createdJournal.id,
      placeNotesCount: createdJournal.placeNotes?.length || 0
    }));

    res.status(200).json({
      status: "success",
      data: createdJournal,
    });
  } catch (error) {
    console.error("Create journal error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create journal",
    });
  }
};

// Get All Journals of the users
export const getAllJournals = async (req, res) => {
  try {
    const journals = await prisma.travelPlanJournal.findMany({
      include: {
        travelPlan: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
      where: {
        travelPlan: {
          visibility: "PUBLIC", // เฉพาะ journal ของ travel plan ที่เป็น PUBLIC
        },
      },
      orderBy: {
        createdAt: "desc", // เรียงตามวันที่สร้างล่าสุด
      },
    });

    // แปลงข้อมูลให้อยู่ในรูปแบบที่ต้องการ
    const formattedJournals = journals.map((journal) => {
      return {
        id: journal.id,
        title: journal.travelPlan.title,
        cityTitle: journal.travelPlan.cityTitle,
        startDate: journal.travelPlan.startDate,
        endDate: journal.travelPlan.endDate,
        username: journal.travelPlan.user.username,
        rating: journal.rating,
        notes: journal.notes,
        createdAt: journal.createdAt,
      };
    });

    res.status(200).json({
      status: "success",
      data: formattedJournals,
    });
  } catch (error) {
    console.error("Get journals error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to get journals",
    });
  }
};

// Get all journals for one user by id
export const getJournalsByID = async (req, res) => {
  try {
    const journalId = parseInt(req.params.id);

    if (!journalId || isNaN(parseInt(journalId))) {
      return res.status(400).json({
        status: "error",
        message: "Invalid journal ID",
      });
    }

    const journal = await prisma.travelPlanJournal.findUnique({
      where: {
        id: journalId,
      },
      include: {
        placeNotes: true,
        travelPlan: {
          include: {
            destinations: {
              include: {
                attachments: true
              }
            }
          }
        }
      }
    });
    
    if (!journal) {
      return res.status(404).json({
        status: "error",
        message: "Journal not found",
      });
    }
    
    console.log(`Returning journal with ID ${journalId} with ${journal.placeNotes?.length || 0} place notes`);
    
    res.status(200).json({
      status: "success",
      data: journal,
    });
  } catch (error) {
    console.error("Get journals error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to get journal by ID",
    });
  }
};

// ตรวจสอบว่าแผนมี Journal อยู่แล้วหรือไม่
export const checkJournalExists = async (req, res) => {
  try {
    const travelPlanId = parseInt(req.params.id);

    if (!travelPlanId || isNaN(travelPlanId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid travel plan ID",
      });
    }

    // ตรวจสอบว่ามี Journal สำหรับแผนนี้หรือไม่
    const journal = await prisma.travelPlanJournal.findUnique({
      where: {
        travelPlanId: travelPlanId,
      },
      select: {
        id: true,
        rating: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      status: "success",
      exists: !!journal,
      journalId: journal ? journal.id : null,
    });
  } catch (error) {
    console.error("Check journal exists error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to check journal existence",
    });
  }
};

// Update Journal by ID
export const updateJournal = async (req, res) => {
  try {
    const journalId = parseInt(req.params.id);
    const { newNotes, newFutureTip, newFavNotes, rating } = req.body;

    if (!journalId || isNaN(journalId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid journal ID",
      });
    }

    // ดึงข้อมูลเดิมจาก DB
    const existingJournal = await prisma.travelPlanJournal.findFirst({
      where: {
        id: journalId,
      },
    });

    if (!existingJournal) {
      return res.status(404).json({
        status: "error",
        message: "Journal not found",
      });
    }

    // สร้างออบเจ็กต์สำหรับอัพเดทข้อมูล โดยใช้ค่าเดิมถ้าไม่มีค่าใหม่
    const updateData = {
      // title: title || existingJournal.title,
      // notes: notes || existingJournal.notes,
      // mood: mood || existingJournal.mood,
      // rating: rating ? parseInt(rating) : existingJournal.rating
      notes: newNotes || existingJournal.notes,
      futureTip: newFutureTip || existingJournal.futureTip,
      favNotes: newFavNotes || existingJournal.favNotes,
      rating: rating ? parseInt(rating) : existingJournal.rating,
    };

    // เช็คว่า rating อยู่ในช่วงที่กำหนด
    if (updateData.rating < 0 || updateData.rating > 5) {
      return res.status(400).json({
        status: "error",
        message: "Rating must be between 0 and 5",
      });
    }

    // อัพเดทข้อมูล
    const journal = await prisma.travelPlanJournal.update({
      where: {
        id: journalId,
      },
      data: updateData,
    });

    // ดึงข้อมูล journal ที่สร้างพร้อมกับ place notes และ attachments
    const createdJournal = await prisma.travelPlanJournal.findUnique({
      where: {
        id: journal.id
      },
      include: {
        placeNotes: true,
        travelPlan: {
          include: {
            destinations: {
              include: {
                attachments: true
              }
            }
          }
        }
      }
    });

    console.log("Returning journal with data:", JSON.stringify({
      id: createdJournal.id,
      placeNotesCount: createdJournal.placeNotes?.length || 0
    }));

    res.status(200).json({
      status: "success",
      data: createdJournal,
    });
  } catch (error) {
    console.error("Update journal error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update journal",
    });
  }
};

export const deleteJournal = async (req, res) => {
  try {
    const journalId = req.params.id;

    // 1. ตรวจสอบว่ามี journalId ส่งมาหรือไม่ และเป็นตัวเลขหรือไม่
    if (!journalId || isNaN(parseInt(journalId))) {
      return res.status(400).json({
        status: "error",
        message: "Invalid journal ID",
      });
    }

    // 2. ตรวจสอบว่า journal นี้มีอยู่จริงหรือไม่
    const existingJournal = await prisma.travelPlanJournal.findUnique({
      where: {
        id: parseInt(journalId),
      },
      include: {
        travelPlan: {
          select: {
            authorId: true,
          },
        },
      },
    });

    if (!existingJournal) {
      return res.status(404).json({
        status: "error",
        message: "Journal not found",
      });
    }

    // 3. ตรวจสอบว่าผู้ใช้มีสิทธิ์ลบ journal นี้หรือไม่
    if (existingJournal.travelPlan.authorId !== req.session.user.id) {
      return res.status(403).json({
        status: "error",
        message: "You don't have permission to delete this journal",
      });
    }

    // 4. ทำการลบ journal
    const deletedJournal = await prisma.travelPlanJournal.delete({
      where: {
        id: parseInt(journalId),
      },
    });

    // 5. ส่งผลลัพธ์กลับ
    res.status(200).json({
      status: "success",
      message: "Journal deleted successfully",
      data: deletedJournal,
    });
  } catch (error) {
    console.error("Delete journal error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete journal",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// LIKE controller

export const createLikes = async (req, res) => {
  try {
    const travelPlanId = parseInt(req.params.id);
    const userId = parseInt(req.session.user.id);

    const likes = await prisma.travelPlanLike.create({
      data: {
        userId: userId,
        travelPlanId: travelPlanId,
      },
    });

    res.status(200).json({
      status: "success",
      data: likes,
    });
  } catch (error) {
    console.error("Create like error:", error);
    res.status(418).json({
      status: error,
      message: "Failed to create Like",
    });
  }
};

export const getlikesById = async (req, res) => {
  const travelPlanId = parseInt(req.params.id);
  const userId = parseInt(req.session.user.id);

  if (!travelPlanId || isNaN(travelPlanId)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid travel plan ID",
    });
  }

  if (!userId || isNaN(userId)) {
    return res.status(401).json({
      status: "error",
      message: "User not authenticated",
    });
  }
  try {
    const likes = await prisma.travelPlanLike.findMany({
      where: {
        travelPlanId: travelPlanId,
      },
      select: {
        userId: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: likes,
    });
  } catch (error) {
    console.error("Get likes error:", error);
    res.status(418).json({
      status: error,
      message: "Failed to get likes",
    });
  }
};

export const deleteLikes = async (req, res) => {
  try {
    const travelPlanId = parseInt(req.params.id);
    const userId = parseInt(req.session.user.id);

    // if (!userId || isNaN(userId)) {
    //   return res.status(401).json({
    //     status: "error",
    //     message: "User not authenticated",
    //   });
    // }

    // 1. ตรวจสอบความถูกต้องของ ID
    if (!travelPlanId || isNaN(travelPlanId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid travel plan ID",
      });
    }

    // 2. ตรวจสอบว่า travel plan มีอยู่จริง
    const existingTravelPlan = await prisma.travelPlan.findUnique({
      where: {
        id: travelPlanId,
      },
    });

    if (!existingTravelPlan) {
      return res.status(404).json({
        status: "error",
        message: "Travel plan not found",
      });
    }

    // 3. ตรวจสอบว่ามี like อยู่จริง
    const existingLike = await prisma.travelPlanLike.findUnique({
      where: {
        travelPlanId_userId: {
          travelPlanId,
          userId,
        },
      },
    });

    if (!existingLike) {
      return res.status(404).json({
        status: "error",
        message: "Like not found",
      });
    }

    // 4. ตรวจสอบว่าเป็น like ของ user คนนี้จริง
    if (existingLike.userId !== userId) {
      return res.status(403).json({
        status: "error",
        message: "You don't have permission to delete this like",
      });
    }

    // 5. ดำเนินการลบ like
    await prisma.travelPlanLike.delete({
      where: {
        travelPlanId_userId: {
          travelPlanId,
          userId,
        },
      },
    });

    res.status(200).json({
      status: "success",
      message: "Like deleted successfully",
    });
  } catch (error) {
    console.error("Delete like error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete like",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// THIS IS THE BOOKMARK CONTROLLER VVVVVV-------------------------------------------------------------------------------------------------------------------------------------------------------

export const createBookmark = async (req, res) => {
  try {
    const travelPlanId = parseInt(req.params.id);
    const userId = parseInt(req.session.user.id);

    const bookmark = await prisma.travelPlanBookmark.create({
      data: {
        userId: userId,
        travelPlanId: travelPlanId,
      },
    });

    res.status(200).json({
      status: "success",
      data: bookmark,
    });
  } catch (error) {
    console.error("Create bookmark error:", error);
    res.status(418).json({
      status: error,
      message: "Failed to create bookmark",
    });
  }
};

export const deleteBookmark = async (req, res) => {
  try {
    const travelPlanId = parseInt(req.params.id);
    const userId = parseInt(req.session.user.id);

    // 1. ตรวจสอบความถูกต้องของ ID
    if (!travelPlanId || isNaN(travelPlanId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid travel plan ID",
      });
    }

    if (!userId || isNaN(userId)) {
      return res.status(401).json({
        status: "error",
        message: "User not authenticated",
      });
    }

    // 2. ตรวจสอบว่า travel plan มีอยู่จริง
    const existingTravelPlan = await prisma.travelPlan.findUnique({
      where: {
        id: travelPlanId,
      },
    });

    if (!existingTravelPlan) {
      return res.status(404).json({
        status: "error",
        message: "Travel plan not found",
      });
    }

    const existingBookmark = await prisma.travelPlanBookmark.findUnique({
      where: {
        travelPlanId_userId: {
          travelPlanId,
          userId,
        },
      },
    });

    if (!existingBookmark) {
      return res.status(404).json({
        status: "error",
        message: "Bookmark not found",
      });
    }

    // 4. ตรวจสอบ
    if (existingBookmark.userId !== userId) {
      return res.status(403).json({
        status: "error",
        message: "You don't have permission to delete this bookmark",
      });
    }

    await prisma.travelPlanBookmark.delete({
      where: {
        travelPlanId_userId: {
          travelPlanId,
          userId,
        },
      },
    });

    res.status(200).json({
      status: "success",
      message: "Bookmark deleted successfully",
    });
  } catch (error) {
    console.error("Delete bookmark error:", error);
    res.status(418).json({
      status: "error",
      message: "Failed to delete bookmark",
    });
  }
};

//get user's travel plans
export const getUserTravelPlans = async (req, res) => {
  try {
    // ตรวจสอบว่ามี session และมีข้อมูลผู้ใช้หรือไม่
    if (!req.session || !req.session.user || !req.session.user.id) {
      return res.status(401).json({
        status: "error",
        message: "Not authenticated. Please log in.",
      });
    }

    const userId = req.session.user.id;

    const travelPlans = await prisma.travelPlan.findMany({
      where: {
        authorId: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        likedByUsers: {
          select: {
            userId: true,
          },
        },
        bookmarkedByUsers: {
          select: {
            userId: true,
          },
        },
        destinations: {
          select: {
            id: true,
            photoUrl: true,
          },
          take: 1, // เอาแค่ destination แรก
        },
      },
    });

    const formattedTravelPlans = travelPlans.map((plan) => {
      // ดึงรูปภาพจาก destination แรก (ถ้ามี)
      let photoUrl = null;
      if (
        plan.destinations &&
        plan.destinations.length > 0 &&
        plan.destinations[0].photoUrl
      ) {
        photoUrl = plan.destinations[0].photoUrl;
      }

      plan.likedByUsers = plan.likedByUsers.map(user => user.userId);

      return {
        id: plan.id,
        title: plan.title,
        cityTitle: plan.cityTitle,
        startDate: plan.startDate,
        endDate: plan.endDate,
        visibility: plan.visibility,
        totalLike: plan.likedByUsers.length, // นับจำนวนไลค์
        likedByUsers: plan.likedByUsers,
        bookmarkedByUsers: plan.bookmarkedByUsers,
        photoUrl: photoUrl, // เพิ่ม photoUrl
        user: {
          id: plan.user.id,
          username: plan.user.username,
        },
      };
    });

    res.status(200).json({
      status: "success",
      data: formattedTravelPlans,
    });
  } catch (error) {
    console.error("Error getting user travel plans:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to get user travel plans",
      error: error.message,
    });
  }
};

// Get user's bookmarked travel plans
export const getUserBookmarks = async (req, res) => {
  // const whereClause = {};
  // const query = req.query;

  // if(query){
  //   if(query.user_id) {;
  //     whereClause.userId = parseInt(query.user_id)
  //   }
  // }

  try {
    // ตรวจสอบว่ามี session และมีข้อมูลผู้ใช้หรือไม่
    // if (!req.session || !req.session.user || !req.session.user.id) {
    //   return res.status(401).json({
    //     status: "error",
    //     message: "Not authenticated. Please log in.",
    //   });
    // }

    const userId = req.session.user.id;

    // const bookmarkedTravelPlans = user.bookmarkedTravelPlans;

    let bookmarkedTravelPlans = await prisma.travelPlanBookmark.findMany({
      where: {
        userId: userId,
      },
      select: {
        travelPlan: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
            likedByUsers: {
              select: {
                userId: true,
              },
            },
            bookmarkedByUsers: {
              select: {
                userId: true,
              },
            },
            destinations: {
              select: {
                id: true,
                photoUrl: true,
              },
              take: 1, // เอาแค่ destination แรก
            },
          },
        },
      },
    });

    bookmarkedTravelPlans = bookmarkedTravelPlans.map(
      (bookmark) => bookmark.travelPlan
    );

    // console.log("likes: ", bookmarkedTravelPlans[2].likedByUsers);

    const formattedBookmarkedTravelPlans = bookmarkedTravelPlans.map((plan) => {
      // ดึงรูปภาพจาก destination แรก (ถ้ามี)
      let photoUrl = null;
      if (
        plan.destinations &&
        plan.destinations.length > 0 &&
        plan.destinations[0].photoUrl
      ) {
        photoUrl = plan.destinations[0].photoUrl;
      }

      return {
        id: plan.id,
        title: plan.title,
        cityTitle: plan.cityTitle,
        startDate: plan.startDate,
        endDate: plan.endDate,
        visibility: plan.visibility,
        totalLike: plan.likedByUsers.length, // นับจำนวนไลค์
        photoUrl: photoUrl, // เพิ่ม photoUrl
        user: {
          id: plan.user.id,
          username: plan.user.username,
        },
      };
    });

    // console.log("bookmarkedTravelPlans: ", bookmarkedTravelPlans);

    // const plan = await prisma.travelPlan.findMany({
    //   where: {
    //     in:
    //   },
    // });

    // ดึงข้อมูล travel plans ที่ผู้ใช้ได้ bookmark ไว้
    // const bookmarkedPlans = await prisma.travelPlanBookmark.findMany({
    //   where: {
    //     userId: userId,
    //   },
    //   include: {
    //     travelPlan: {
    //       include: {
    //         user: {
    //           select: {
    //             id: true,
    //             username: true,
    //           },
    //         },
    //         likedByUsers: {
    //           select: {
    //             userId: true,
    //           },
    //         },
    //         bookmarkedByUsers: {
    //           select: {
    //             userId: true,
    //           },
    //         },
    //         destinations: {
    //           select: {
    //             id: true,
    //             photoUrl: true,
    //           },
    //           // take: 1, // เอาแค่ destination แรก
    //         },
    //       },
    //     },
    //   },
    // });

    // แปลงข้อมูลให้อยู่ในรูปแบบเดียวกับ getUserTravelPlans
    // const formattedBookmarks = bookmarkedPlans.map(bookmark => {
    //   const plan = bookmark.travelPlan;

    //   // ดึงรูปภาพจาก destination แรก (ถ้ามี)
    //   let photoUrl = null;
    //   if (plan.destinations && plan.destinations.length > 0 && plan.destinations[0].photoUrl) {
    //     photoUrl = plan.destinations[0].photoUrl;
    //   }

    //   return {
    //     id: plan.id,
    //     title: plan.title,
    //     cityTitle: plan.cityTitle,
    //     startDate: plan.startDate,
    //     endDate: plan.endDate,
    //     visibility: plan.visibility,
    //     totalLike: plan.likedByUsers.length, // นับจำนวนไลค์
    //     photoUrl: photoUrl, // เพิ่ม photoUrl
    //     user: {
    //       id: plan.user.id,
    //       username: plan.user.username,
    //     },
    //   };
    // });

    res.status(200).json({
      status: "success",
      data: formattedBookmarkedTravelPlans,
    });
  } catch (error) {
    console.error("Error getting user bookmarks:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to get user bookmarks",
      error: error.message,
    });
  }
};
