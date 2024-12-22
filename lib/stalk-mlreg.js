const fetch = require('node-fetch');

exports.stalkml = async (userId, zoneId) => {
    return new Promise(async (resolve, reject) => {
        if (!userId || !zoneId) {
            return resolve({
                status: 400,
                msg: 'Format Salah! Silakan gunakan dengan cara: stalkml userId zoneId'
            });
        }

        const url = 'https://order-sg.codashop.com/validate';
        const country = "SG";
        
        const params = new URLSearchParams();
        params.append('country', country);
        params.append('userId', userId);
        params.append('voucherTypeName', "MOBILE_LEGENDS");
        params.append('zoneId', zoneId);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: params
            });

            const data = await response.json();

            if (data.success === false) {
                resolve({
                    status: 404,
                    msg: 'User Id or ZoneId Not Found'
                });
            } else {
                const encodedUsername = data.result.username;
                const decodedUsername = decodeURIComponent(encodedUsername);

                resolve({
                    status: 200,
                    id: userId,
                    zoneId: zoneId,
                    nickname: decodedUsername
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            resolve({
                status: 500,
                msg: 'Internal Server Error'
            });
        }
    });
}
