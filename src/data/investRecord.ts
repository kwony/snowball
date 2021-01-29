export interface record {
    title: string,
    averageYield: number | null | string
}

export const recordList: Array<record> = [
    {
        title: '직접입력하기',
        averageYield: null
    },
    {
        title: '워런퍼핏 연평균 수익률', // https://ppss.kr/archives/53891
        averageYield: 22.3
    },
    {
        title: '피터린치 마젤란 펀드 연평균 수익률', // https://blog.naver.com/m_invest/221617958906
        averageYield: 29.2
    },
    {
        title: '레이달리오 올웨더 연평균 수익률', // https://www.iruda.io/blog/197
        averageYield: 7.5
    },
    {
        title: 'S&P 10년 연평균 수익률', // https://www.investopedia.com/articles/investing/122215/spy-spdr-sp-500-trust-etf.asp
        averageYield: 13.55
    },
    {
        title: '나스닥 10년 연평균 수익률', // https://www.invesco.com/us/financial-products/etfs/product-detail?productId=QQQ&ticker=QQQ&title=invesco-qqq=portfolio&audienceType=investors#portfolio
        averageYield: 20.63	
    },
    {
        title: '2020년 20대 남자 주식계좌 수익률', // https://www.mk.co.kr/news/society/view/2021/01/26577/
        averageYield: 3.81
    }
]