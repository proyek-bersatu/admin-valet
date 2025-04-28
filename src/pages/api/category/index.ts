import { CONFIG } from '@/config';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    payload?: {
        days: string;
        name: string;
        price: number;
        id?: string;
        type: string;
        areaId?: string;
        data?: string;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const { name, price, days, areaId, type, id } = req.body
        const requiredBody = ["name", "price", "days", "areaId", "type"];

        if (req.method === 'POST') {

            for (let index = 0; index < requiredBody.length; index++) {
                const element = requiredBody[index];
                if (!element) {
                    return res.status(400).json({ message: `${element} are required` })
                }
            }

            const result = await axios.post(CONFIG.base_url_api + '/partner/category', {
                name, price, days, areaId, type
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
                message: 'Category created successfully',
                payload: { name, days, price, type, areaId },
            })
        }

        if (req.method === 'PATCH') {

            for (let index = 0; index < requiredBody.length; index++) {
                const element = requiredBody[index];
                if (!element) {
                    return res.status(400).json({ message: `${element} are required` })
                }
            }

            const result = await axios.put(CONFIG.base_url_api + '/partner/category' + `/${id}`, {
                name, price, days, areaId, type, id
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
                message: 'Category updated successfully',
                payload: { name, price, days, areaId, type, id },
            })
        }

        if (req.method === 'DELETE') {

            await axios.delete(CONFIG.base_url_api + '/partner/category' + `/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${req.cookies.token}`
                }
            });

            return res.status(201).json({
                message: 'Category deleted successfully',
            })
        }

        return res.status(405).json({ message: 'Method Not Allowed' })
    } catch (error: any) {
        console.log(error, "error msg");
        return res.status(400).json({ message: error?.response?.data?.error || error?.response?.data?.message })
    }
}