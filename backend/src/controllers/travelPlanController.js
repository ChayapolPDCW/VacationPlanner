/**
 * <https://www.npmjs.com/package/@types/google.maps>
 */
import prisma from "../services/dbService.js";

// THIS IS THE TRAVEL PLAN CONTROLLER --------------------------------------------------------------------------------------------------------------------------------------------------------

//create travel plan
export const createTravelPlan = async (req, res) => {

  
  try {
    if (!req.session.user) {
      res.status(418).json({
        message: "Author ID not provided",
      });
    }

    const authorId = req.session.user.id;
    const { title, startDate, endDate, visibility, itinerary } = req.body;

    if (!title || !startDate || !endDate || !visibility || !itinerary) {
      res.status(400).json({
        message: "Error creating TravelPlan: Invalid argument",
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

      res.status(201).json({
        status: "success",
        message: "TravelPlan created successfully with no itinerary",
        data: newTravelPlan,
      });
    }

    const addedDestinationIdList = [];

    itinerary.map((day) => {
      console.log("Processing day:", day);

      day.places.map(async (place, placeIndex) => {
        console.log(`Processing the #${placeIndex} place:`, place);

        const newTravelPlanDestination =
          await prisma.travelPlanDestination.create({
            data: {
              travelPlanId: newTravelPlan.id,
              title: place.title,
              latitude: place.latitude,
              longitude: place.longitude,
              photoUrl: place.photoUrl,
              googlePlaceId: place.googlePlaceId,
              startDate: day.date,
              dailyVisitOrder: placeIndex,
            },
          });

        if (!newTravelPlanDestination) {
          await prisma.travelPlanDestination.deleteMany({
            where: {
              id: { in: addedDestinationIdList },
            },
          });
        } else {
          console.log("New destination added: ", newTravelPlanDestination.id);
          addedDestinationIdList.append(newTravelPlanDestination.id);
        }
      });
    });

    res.status(201).json({
      status: "success",
      message: "Travel plan created successfully",
      data: newTravelPlan,
    });
  } catch (error) {
    console.error("Error creating travel plan:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to create travel plan",
      error: error.message,
    });
  }
};

//get all travel plans
export const getAllTravelPlans = async (req, res) => {
  try {
    const travelPlans = await prisma.travelPlan.findMany();
    
    res.status(200).json({
      status: "success",
      data: travelPlans,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get all travel plans",
      error: error.message,
    });
  }
};

//get travel plan by id
export const getTravelPlanById = async (req, res) => {

  try {
    const travelPlan = await prisma.travelPlan.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });


    if (!travelPlan) {
      return res.status(404).json({
        status: "error",
        message: "Travel plan not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: travelPlan,
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

    const travelPlanId = req.params.id;
    const { newTitle, newStartDate, newEndDate, newVisibility } = req.body;

    const travelPlanIdInt = parseInt(travelPlanId);
    const newStartDateType = new Date(newStartDate);  
    const newEndDateType = new Date(newEndDate);

    console.log("newStartDateType: ", newStartDateType);
    console.log("newEndDateType: ", newEndDateType);

    if(!travelPlanId){
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
      })
    }

    // ถ้า Edit วัน วันที่มีการนําออกไป ข้อมูลใน TravelPlanDestination จะต้องถูกลบออกไป

    // if (newStartDateType != existingTravelPlan.startDate || newEndDateType != existingTravelPlan.endDate) {
      
      // onDelete
    // }

    const travelPlanUpdated = await prisma.travelPlan.update({

      where: {
        id: travelPlanIdInt,
      },
      data: {
        title : newTitle,
        startDate: newStartDateType,
        endDate: newEndDateType,
        visibility: newVisibility,
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
    const { title, notes, mood, rating} = req.body;
    const journalId = req.params.id;

    const ratingInt = parseInt(rating);
    if(ratingInt < 0 || ratingInt > 10){
      return res.status(400).json({
        status: "error",
        message: "Rating must be between 0 and 10",
      });
    }

    if(!title){
      return res.status(400).json({
        status: "error",
        message: "Title is required",
      });
    }

    if(!notes){
      return res.status(400).json({ 
        status: "error",
        message: "Notes are required",
      });
    }

  if(!mood){
    return res.status(400).json({
      status: "error",
      message: "Mood is required",
    })
  }

  if(!journalId){
    return res.status(400).json({ 
      status: "error",
      message: "Travel plan ID not provided",
    });
  }
  if(!ratingInt){
    return res.status(400).json({
      status: "error",
      message: "Rating is required",
    })
  }
    const journal = await prisma.travelPlanJournal.create({
      data: {
        title : title,
        notes : notes,
        mood : mood,
        rating : ratingInt,
        travelPlanId: parseInt(journalId),
      },
    });

    res.status(200).json({
      status: "success",
      data: journal,
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
      select: {
        id: true,
        title: true,
        notes: true,
        mood: true,
        rating: true,
        createdAt: true,
      },
    });
    res.status(200).json({
      status: "success",
      data: journals,
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

    const journals = await prisma.travelPlanJournal.findUnique({
      where: {
        id: journalId,
      },
      select: {
        id: true,
        title: true,
        notes: true,
        mood: true,
        rating: true,
        createdAt: true,
      },
    });
    res.status(200).json({
      status: "success",
      data: journals,
    });
  } catch (error) {
    console.error("Get journals error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to get journal by ID",
    });
  }
};

// Update Journal by ID
export const updateJournal = async (req, res) => {
  try {
    const journalId = parseInt(req.params.id);
    const { title, notes, mood, rating } = req.body;
    
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
      title: title || existingJournal.title,
      notes: notes || existingJournal.notes,
      mood: mood || existingJournal.mood,
      rating: rating ? parseInt(rating) : existingJournal.rating
    };

    // เช็คว่า rating อยู่ในช่วงที่กำหนด
    if (updateData.rating < 0 || updateData.rating > 10) {
      return res.status(400).json({
        status: "error",
        message: "Rating must be between 0 and 10",
      });
    }

    // อัพเดทข้อมูล
    const journal = await prisma.travelPlanJournal.update({
      where: {
        id: journalId,
      },
      data: updateData
    });

    res.status(200).json({
      status: "success",
      data: journal,
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
            authorId: true
          }
        }
      }
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
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
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
        userId : userId,
        travelPlanId : travelPlanId,
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

export const deleteLikes = async (req, res) => {
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

    // 3. ตรวจสอบว่ามี like อยู่จริง
    const existingLike = await prisma.travelPlanLike.findUnique({
      where: {
        userId_travelPlanId: {
          userId,
          travelPlanId,
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
        userId_travelPlanId: {
          userId,
          travelPlanId,
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
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
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
        userId : userId,
        travelPlanId : travelPlanId,
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
        userId_travelPlanId: {
          userId,
          travelPlanId,
        },
      },
    });


    if (!existingBookmark) {
      return res.status(404).json({
        status: "error",
        message: "Bookmark not found",
      });
    }

    // 4. ตรวจสอบว่าเป็น like ของ user คนนี้จริง
    if (existingBookmark.userId !== userId) {
      return res.status(403).json({
        status: "error",
        message: "You don't have permission to delete this bookmark",
      });
    }

    await prisma.travelPlanBookmark.delete({
      where: {
        userId_travelPlanId: {
          userId,
          travelPlanId,
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
