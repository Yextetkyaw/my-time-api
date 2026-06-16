const express = require('express');
const moment = require('moment-timezone');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/time', (req, res) => {
    // User က timezone မပြောရင် 'Asia/Yangon' (မြန်မာစံတော်ချိန်) ကို Default ထားပါမယ်
    // ဥပမာ- /api/time?tz=America/New_York ဆိုပြီးလည်း လှမ်းတောင်းလို့ရပါတယ်
    const tz = req.query.tz || 'Asia/Yangon';
    
    try {
        const now = moment().tz(tz);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        res.json({
            success: true,
            requested_timezone: tz,
            formatted_datetime: now.format('YYYY-MM-DD HH:mm:ss'),
            
            // သင်အလိုရှိတဲ့ အစိတ်အပိုင်းများ
            
            date: now.format('YYYY-MM-DD'),
            day: parseInt(now.format('D')),
            month_name: now.format('MMMM'),
            today: now.format('MMMM D dddd'),
            time: now.format('HH:mm:ss'),
            hour: parseInt(now.format('HH')),
            minutes: parseInt(now.format('mm')),
            seconds: parseInt(now.format('ss')),
            milliseconds: new Date().getMilliseconds(),
            day_of_week: days[now.day()], // ဥပမာ - Friday
            timezone: now.format('z (Z)'), // ဥပမာ - +06:30
            
            // ထပ်တိုး သိသင့်တဲ့ Data များ
            epoch_timestamp: now.valueOf(),
            is_leap_year: now.isLeapYear()
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid timezone. Please use valid IANA timezone name (e.g., Asia/Yangon, UTC)."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

