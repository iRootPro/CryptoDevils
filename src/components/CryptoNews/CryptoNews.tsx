import { Card, Carousel, Image, Typography } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import {
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
} from '../../assets/images/newsTemplates';
import { useGetNewsQuery } from '../../services/newsApi';
import shuffle from '../../utils/shuffleArray';
import styles from './CryptoNews.module.scss';


const { Text } = Typography;

const CryptoNews: FC = () => {
    const { data, isLoading } = useGetNewsQuery('');
    const imageTemplates = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
        img10,
        img11,
        img12,
        img13,
        img14,
        img15,
    ];
    const randomImage = shuffle(imageTemplates)
    if (isLoading) return (
        <Carousel slidesToShow={5} dots={false}>
            {randomImage.map(item => (
                <Card key={`skeleton ${item}`} loading bordered={false} bodyStyle={{ height: 204 }}>
                    {item}
                </Card>
            ))}
        </Carousel>
    )
    return (
        <Carousel slidesToShow={5} arrows autoplay dots={false}>
            {data?.results.map((news, index) => (
                <a
                    key={`news_${index + 1}`}
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Card bordered={false} bodyStyle={{ padding: 15 }}>
                        <div
                            className={`${styles.imageWrapper} ${styles.wrapper}`}
                        >
                            <Image
                                preview={false}
                                className={`${styles.newsImage} ${styles.image}`}
                                src={news.image_url || randomImage[index]} />
                        </div>
                        <div
                            className={`${styles.nameWrapper} ${styles.wrapper}`}
                        >
                            <Text
                                className={`${styles.newsName} ${styles.name}`}
                            >
                                {news.title}
                            </Text>
                        </div>
                        <Text className={`${styles.pubDate} ${styles.date}`}>
                            {moment(news.pubDate).fromNow()}
                        </Text>
                    </Card>
                </a>
            ))}
        </Carousel>
    );
};

export default React.memo(CryptoNews);
