require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const pvinfoEndpoint = process.env.PVINFO_ENDPOINT || 'https://gs1.koreannet.or.kr';

app.use(cors()); // Access-Control-Allow-Origin: * 추가 

app.get('/products/:barcode', async (req, res) => {

  try {
    const { barcode } = req.params;
    const url = `${pvinfoEndpoint}/pr/${barcode}`;
    console.log(url);
    
    const response = await axios.get(url);
    //console.log(response.data);   
    const html = response.data;
    const $ = cheerio.load(html);
    
    //-- 상품명 
    const productName = $('.pv_title > h3').text().trim();
    //-- 상품이미지 
    const productImage = pvinfoEndpoint + $('.pv_img img').attr('src');
    const productPrice = '잠시 기다려 달라. 찾아야함';
    
    
    const productDetails = {};
    $('.pv_info tr').each((index, element) => {
      const label = $(element).find('th').text().trim();
      const value = $(element).find('td').text().replace(/[\n\t]/g, '').replace(/\s+/g, ' ').trim();
      if (label && value) {
        productDetails[`pvInfo${index}`] = {
          label,
          value
        };
      }
    });
    
    // JSON 응답
    res.json({
      barcode,
      productName,
      productImage,
      productPrice,
      productDetails
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      error: '상품 정보를 가져오는 중 오류가 발생했습니다.'
    });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`http://localhost:${port} 자네왔능가?`);
}); 