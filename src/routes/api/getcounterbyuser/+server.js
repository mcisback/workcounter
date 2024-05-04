// @ts-nocheck
// import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import getMongoDB from '$lib/mongo';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const name = url.searchParams.get('name')
    
    try {
        const database = await getMongoDB('Employees');
        const collection = database.collection('WorkCounter');
        
        const records = await collection.find({
            name
        }).toArray()

        console.log(`Employee ${name} records: `, records);

        return json({
            success: true,
            records,
        });

      } catch (err) {
        console.error("Error getting: ", err);

        return json({
            success: false,
            err,
        });
    }

    //   } finally {
    //     await client.close();
    //   }
}