import { connectToDatabase } from "./db.js";
import  {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';

// export async function getUserById(id) {
//     const {data, error} = await supabase.from('users').select('*').eq('id', id).single();
//     if(error) throw error
//     return data

// }

async function connectToUsersCollection() {
    const db = await connectToDatabase();
    return await db.collection('users');
}

export async function getUserByIdFDB(id) {
     try {
        const usersCollection = await connectToUsersCollection();
        const result = await usersCollection.findOne({"_id":new ObjectId(id)})

        if (!result) {
            return { success: false, data: null, error: 'user not found' };
        }

        return { success: true, data: result, error: null };
    } catch (error) {
        return { success: false, data: null, error };
    }
 
}


export async function getUserByNameAndPassword(username, password) {
    try {
        const usersCollection = await connectToUsersCollection();

        const user = await usersCollection.findOne({ username });

        if (!user) {
            return { success: false, data: null, error: 'user not found' };
        }

        console.log(`user.password:` + user.hashedPassword + "password: " + password);
        
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

        if (!passwordMatch) {
            return { success: false, data: null, error: 'wrong password' };
        }

        return { success: true, data: user, error: null };

    } catch (error) {
        return { success: false, data: null, error };
    }
}


export async function getAllUsersFDB() {
    try {
        const usersCollection = await connectToUsersCollection();
        const result = await usersCollection.find().toArray();

        if (!result || result.length === 0) {
            return { success: false, data: null, error: 'No users found' };
        }

        return { success: true, data: result, error: null };
    } catch (error) {
        console.log(`error: concted to mongodb`);
        
        return { success: false, data: null, error };
    }
}



export async function insertNewUsernameTDB(username) {
    const usersCollection = await connectToUsersCollection();

    try {
        const result = await usersCollection.insertOne(username);

        if (!result.acknowledged) {
            return { success: false, data: null, error: 'Insert failed' };
        }

        return { success: true, data: result.insertedId, error: null };
    } catch (error) {
        return { success: false, data: null, error };
    }
}



export async function updateUsernameTDB(id, username) {
    try {
        const usersCollection = await connectToUsersCollection();

        const result = await usersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set:  username  }
        );
console.log(result);

        if (result.modifiedCount === 0) {
            return { success: false, error: 'No user updated' };
        }

        return { success: true, error: null };

    } catch (error) {
        return { success: false, error };
    }
}


export async function deleteUsernameFDB(id) {
     try {
        const usersCollection = await connectToUsersCollection();

        const result = await usersCollection.deleteOne(
            { _id: new ObjectId(id) }
        );

        if (result.modifiedCount === 0) {
            return { success: false, error: 'No user deleted' };
        }

        return { success: true, error: null };

    } catch (error) {
        return { success: false, error };
    }
}

// const result = await getUserById(1);

// if (!result.success) {
//     console.error('Error:', result.error.message);
// } else {
//     console.log('User:', result.data);
// }

// const result = await getAllUsers();

// if (!result.success) {
//     console.error('Insert failed:', result.error.message);
// } else {
//     console.log('ss', result.data);
// }

