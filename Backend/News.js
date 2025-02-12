const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express()
const port =5000
app.get('/api/news', async (req, res) => {
    try {
        const response = await axios.get('https://api.apitube.io/v1/news/topic/iag-qag/agriculture_news?api_key=api_live_EFJ0RbeIMM0vER9c4ksOcUnFrS9X70OzEv7k82n3CXQaksZIFm9NI7j&per_page=25&source.country.code=in&language.name=English');
        
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});