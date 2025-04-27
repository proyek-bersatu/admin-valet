import { CONFIG } from '@/config';
import axios from 'axios';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    payload?: {
        email?: string;
        password?: string;
        user?: any;
        token?: any;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const { email, password } = req.body
        const requiredBody = ["email", "password"];

        if (req.method === 'POST') {

            // Simulate user creation (normally, you’d interact with DB here)
            for (let index = 0; index < requiredBody.length; index++) {
                const element = requiredBody[index];
                if (!element) {
                    return res.status(400).json({ message: `${element} are required` })
                }
            }

            const result = await axios.post(CONFIG.base_url_api + '/partner/auth/login', {
                email, password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const token = result.data?.data?.token;

            const user = await axios.get(CONFIG.base_url_api + "/partner/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const serialized = serialize('token', result.data?.data?.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 1, // 1 day
                path: '/',
            })

            res.setHeader('Set-Cookie', serialized)

            return res.status(201).json({
                message: 'User BO login successfully',
                payload: { user: user?.data?.data, token: token },
            })
        }

        return res.status(405).json({ message: 'Method Not Allowed' })
    } catch (error: any) {
        console.log(error, "error msg");
        return res.status(400).json({ message: error?.response?.data?.error || error?.response?.data?.message })
    }
}