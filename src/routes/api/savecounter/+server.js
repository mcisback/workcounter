// @ts-nocheck
// import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import getMongoDB from '$lib/mongo';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { name, startDate, endDate, hours, minutes, seconds } = await request.json();

    try {
        const database = await getMongoDB('Employees');
        const collection = database.collection('WorkCounter');
        
        const result = await collection.insertOne({
            name,
            startDate,
            endDate,
            hours,
            minutes,
            seconds,
        });

        console.log(`Documento inserito con _id: ${result.insertedId}`);

        return json({
            success: true,
            insertedId: result.insertedId,
        });

      } catch (err) {
        console.error("Error inserting: ", err);

        return json({
            success: false,
            err,
        });
    }

    //   } finally {
    //     await client.close();
    //   }
}