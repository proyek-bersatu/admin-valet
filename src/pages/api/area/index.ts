import { CONFIG } from '@/config';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    payload?: {
        lat: string;
        name: string;
        long: string;
        id?: string;
        status?: string;
        data?: string;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const { name, lat, long, status, id } = req.body
        const requiredBody = ["name", "lat", "long"];

        if (req.method === 'POST') {

            for (let index = 0; index < requiredBody.length; index++) {
                const element = requiredBody[index];
                if (!element) {
                    return res.status(400).json({ message: `${element} are required` })
                }
            }

            const result = await axios.post(CONFIG.base_url_api + '/partner/areas', {
                name, lat: +lat, long: +long
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
                message: 'Area created successfully',
                payload: { name, long, lat },
            })
        }

        if (req.method === 'PATCH') {

            for (let index = 0; index < requiredBody.length; index++) {
                const element = requiredBody[index];
                if (!element) {
                    return res.status(400).json({ message: `${element} are required` })
                }
            }

            const result = await axios.put(CONFIG.base_url_api + '/partner/areas' + `/${id}`, {
                name, lat: +lat, long: +long, status
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
                message: 'Area updated successfully',
                payload: { name, lat, long, status },
            })
        }

        if (req.method === 'DELETE') {

            await axios.delete(CONFIG.base_url_api + '/partner/areas' + `/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${req.cookies.token}`
                }
            });

            return res.status(201).json({
                message: 'Area deleted successfully',
            })
        }

        return res.status(405).json({ message: 'Method Not Allowed' })
    } catch (error: any) {
        console.log(error, "error msg");
        return res.status(400).json({ message: error?.response?.data?.error || error?.response?.data?.message })
    }
}