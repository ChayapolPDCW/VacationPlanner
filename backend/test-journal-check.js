// ไฟล์ทดสอบเส้นทาง API /api/plans/:id/journal/check
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testJournalCheck(planId) {
  try {
    console.log(`Checking if plan ${planId} has a journal...`);
    
    const journal = await prisma.travelPlanJournal.findFirst({
      where: {
        travelPlanId: parseInt(planId),
      },
      select: {
        id: true,
      },
    });
    
    console.log('Result:', {
      exists: !!journal,
      journalId: journal ? journal.id : null,
    });
    
    return {
      status: "success",
      exists: !!journal,
      journalId: journal ? journal.id : null,
    };
  } catch (error) {
    console.error("Error checking journal existence:", error);
    return {
      status: "error",
      message: "Failed to check journal existence",
    };
  } finally {
    await prisma.$disconnect();
  }
}

// ทดสอบกับ plan ID ที่ต้องการ
const planId = process.argv[2] || 102;
testJournalCheck(planId)
  .then(result => console.log('Test completed successfully'))
  .catch(error => console.error('Test failed:', error));
