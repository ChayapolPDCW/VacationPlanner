import prisma from "../services/dbService.js";

// Create destination
export async function createDestination(
  travelPlanId,
  title,
  latitude,
  longitude,
  photoUrl,
  googlePlaceId,
  startDate,
  dailyVisitOrder
) {
  if (
    !travelPlanId ||
    !title ||
    !latitude ||
    !longitude ||
    !googlePlaceId ||
    !startDate ||
    !dailyVisitOrder
  ) {
    return null;
  }

  const newTravelPlanDestination = await prisma.travelPlanDestination.create({
    data: {
      travelPlanId: travelPlanId,
      title: title,
      latitude: latitude,
      longitude: longitude,
      photoUrl: photoUrl,
      googlePlaceId: googlePlaceId,
      startDate: startDate,
      dailyVisitOrder: dailyVisitOrder,
    },
  });

  return newTravelPlanDestination.id;
}

// delete destination

export async function deleteDestination(destinationId) {
  if (!destinationId) {
    return null;
  }

  const deletedTravelPlanDestination =
    await prisma.travelPlanDestination.delete({
      where: {
        id: destinationId,
      },
    });

  return deletedTravelPlanDestination.id;
}
