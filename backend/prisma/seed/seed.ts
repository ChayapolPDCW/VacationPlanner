import { createSeedClient } from "@snaplet/seed";
import { copycat } from "@snaplet/copycat";
import crypto from "crypto";

const password = '123456789';

const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
const hashedPassword = `${salt}:${hash}`;

const main = async () => {
    const key = copycat.generateHashKey("hello, world");

    const seed = await createSeedClient({
        models: {
            user: {
                data: {
                    password: hashedPassword
                }
            }
        }
    });

    await seed.$resetDatabase();

    await seed.user((x) => x(1, {
        username: "john.doe",
        email: "jd@example.com",
    }));

    const user = await seed.user((x) => x(10, {
        username: ({ seed }) => copycat.username(seed),
        email: ({ seed }) => copycat.email(seed),
        avatarUrl: ({ seed }) => copycat.url(seed),
        experienceLevel: ({ seed }) => copycat.int(seed, {
            min: 0,
            max: 100
        }),
    }));

    const travelPlan = await seed.travelPlan((x) => x(30, {
        title: ({ seed }) => copycat.city(seed) + ", " + copycat.country(seed),
        notes: ({ seed }) => copycat.paragraph(seed, {
            minSentences: 3,
            maxSentences: 10
        }),
        cityTitle: ({ seed }) => copycat.city(seed),
    }
    ));

    const travelPlanJournal = await seed.travelPlanJournal((x) => x(10, {
        notes: ({ seed }) => copycat.paragraph(seed, {
            minSentences: 3,
            maxSentences: 10
        }),
        futureTip: ({ seed }) => copycat.paragraph(seed, {
            minSentences: 3,
            maxSentences: 10
        }),
        favNotes: ({ seed }) => copycat.paragraph(seed, {
            minSentences: 3,
            maxSentences: 10
        }),
        rating: ({ seed }) => copycat.int(seed, {
            min: 0,
            max: 5
        }),
    }));

    const travelPlanDestination = await seed.travelPlanDestination((x) => x(39));

    const travelPlanDestinationAttachment = await seed.travelPlanDestinationAttachment((x) => x({
        min: 0,
        max: 4
    }));

    const travelPlanLike = await seed.travelPlanLike((x) => x(10));

    const travelPlanBookmark = await seed.travelPlanBookmark((x) => x(10));

    console.log("Database seeded successfully!");

    process.exit();
};

main();
