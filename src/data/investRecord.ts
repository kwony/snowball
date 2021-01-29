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
        title: '워런퍼핏 연평균 수익률',
        averageYield: 22.3
    },
    {
        title: '피터린치 마젤란 펀드 연평균 수익률',
        averageYield: 29.2
    },
    {
        title: '레이달리오 올웨더 연평균 수익률',
        averageYield: 6.4
    },
    {
        title: 'S&P 10년 연평균 수익률',
        averageYield: 13.55
    },
    {
        title: '나스닥 10년 연평균 수익률',
        averageYield: 19.93
    }
]