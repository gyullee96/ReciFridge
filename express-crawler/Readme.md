# 바코드 / 상품정보 API 크롤링서버 


## 환경변수 파일 

```env
PORT=3000
PRODUNCT_INFO_SVR_ENDPOINT=https://gs1.koreannet.or.kr
```

## 서버 실행법 

```
  npm install 
  npm run dev 
```


## 호출문법 

```
[GET] http://localhost:3000/products/:barcode  
```

ex) http://localhost:3000/products/8801115336709

### 결과값 



```
{
    barcode: "8801115336709",
    productName: "서울우유 아침에주스100% 사과210ml",
    productImage: "https://gs1.koreannet.or.kr/pr/photoView.do?fileNm=8801115336709_1.jpg&filePath=8801115000013/8801115336709",
    productPrice: "잠시 기다려 달라. 찾아야함",
    productDetails: {
        pvInfo0: {
            label: "KAN 상품분류코드",
            value: "01170501"
        },
        pvInfo1: {
            label: "KAN 상품분류",
            value: "가공식품 > 음료류 > 주스 > 천연과즙음료"
        },
        pvInfo2: {
            label: "바코드(GTIN)",
            value: "8801115336709"
        },
        pvInfo3: {
            label: "제조국가",
            value: "KOREA, REPUBLIC OF"
        },
        pvInfo5: {
            label: "판매자",
            value: "서울우유협동조합"
        },
        pvInfo6: {
            label: "업체주소 (도로명주소)",
            value: "서울특별시 중랑구 상봉동 137-7 (서울특별시 중랑구 중랑천로 71 (상봉동))"
        },
        pvInfo7: {
            label: "대표전화",
            value: "02-490-8518"
        },
        pvInfo8: {
            label: "수정일",
            value: "2009-06-03 00:00:00"
        }
    }
}
```