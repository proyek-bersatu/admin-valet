import { CONFIG } from '@/config';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    payload?: {
        email: string;
        name: string;
        phone: string;
        username?: string;
        id?: string;
        area_id?: number;
        password?: string;
        status: string;
        data?: string;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const { email, name, phone, username, status, password, area_id, id } = req.body
        const requiredBody = ["email", "name", "phone", "username", "status", "area_id"];

        if (req.method === 'POST') {

            // Simulate user creation (normally, you’d interact with DB here)
            for (let index = 0; index < requiredBody.length; index++) {
                const element = requiredBody[index];
                if (!element) {
                    return res.status(400).json({ message: `${element} are required` })
                }
            }

            const result = await axios.post(CONFIG.base_url_api + '/v1/partner/user', {
                email, name, phone, username, status, area_id, password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${req.cookies.token}`
                }
            });

            if (result.status !== 201) {
                return res.status(400).json({ message: result?.data?.error })
            }

            return res.status(201).json({
                message: 'User created successfully',
                payload: { email, name, phone, username, status, id, area_id },
            })
        }

        if (req.method === 'PATCH') {

            // Simulate user creation (normally, you’d interact with DB here)
            for (let index = 0; index < requiredBody.length; index++) {
                const element = requiredBody[index];
                if (!element) {
                    return res.status(400).json({ message: `${element} are required` })
                }
            }

            const result = await axios.patch(CONFIG.base_url_api + '/v1/partner/user' + `/${id}`, {
                email, name, phone, username, status, area_id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${req.cookies.token}`
                }
            });

            if (result.status === 400) {
                return res.status(400).json({ message: result?.data?.error })
            }

            return res.status(201).json({
                message: 'User updated successfully',
                payload: { email, name, phone, username, status, id, area_id },
            })
        }

        if (req.method === 'DELETE') {

            await axios.delete(CONFIG.base_url_api + '/v1/partner/user' + `/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${req.cookies.token}`
                }
            });

            return res.status(201).json({
                message: 'User deleted successfully',
            })
        }

        return res.status(405).json({ message: 'Method Not Allowed' })
    } catch (error: any) {
        console.log(error, "error msg");
        return res.status(400).json({ message: error?.response?.data?.error || error?.response?.data?.message })
    }
}