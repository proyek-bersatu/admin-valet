import { CONFIG } from '@/config';
import { dateToEpoch } from '@/utils';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string;
    payload?: {
        email: string;
        name: string;
        phone: string;
        id?: string;
        address?: number;
        startDateSubscription?: string;
        endDateSubscription?: string;
        data?: string;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const { email, name, phone, address, id, startDateSubscription, endDateSubscription, code, status } = req.body
        const requiredBody = ["email", "name", "phone", "startDateSubscription", "endDateSubscription", "address"];

        if (req.method === 'POST') {

            // Simulate user creation (normally, you’d interact with DB here)
            for (let index = 0; index < requiredBody.length; index++) {
                const element = requiredBody[index];
                if (!element) {
                    return res.status(400).json({ message: `${element} are required` })
                }
            }

            const result = await axios.post(CONFIG.base_url_api + `/v1/bo/partner`, {
                email, name, phone, address, startDateSubscription: dateToEpoch(startDateSubscription), endDateSubscription: dateToEpoch(endDateSubscription)
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
                message: 'Partner created successfully',
                payload: { email, name, phone, address, endDateSubscription, startDateSubscription, id },
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

            const result = await axios.put(CONFIG.base_url_api + '/v1/bo/partner' + `/${id}`, {
                email, name, phone, address, startDateSubscription: dateToEpoch(startDateSubscription), endDateSubscription: dateToEpoch(endDateSubscription), code, status
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
                message: 'Partner updated successfully',
                payload: { email, name, phone, address, endDateSubscription, startDateSubscription, id },
            })
        }

        if (req.method === 'DELETE') {

            await axios.delete(CONFIG.base_url_api + '/v1/bo/partner' + `/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${req.cookies.token}`
                }
            });

            return res.status(201).json({
                message: 'Partner deleted successfully',
            })
        }

        return res.status(405).json({ message: 'Method Not Allowed' })
    } catch (error: any) {
        console.log(error, "error msg");
        return res.status(400).json({ message: error?.response?.data?.error || error?.response?.data?.message })
    }
}