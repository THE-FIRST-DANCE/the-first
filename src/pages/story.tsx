import { useEffect, useState } from 'react';
import SwiperBox from '@components/Story';
import { baseAxios } from '@axios';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { StoryType } from '@interfaces/story.interface';

const slideVariants = {
  hidden: (direction: string) => ({
    x: direction === 'next' ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  }),
  first: {
    x: 0,
    opacity: 0,
    scale: 0.4,
    transition: { duration: 0.3 },
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      damping: 20,
    },
  },
  exit: (direction: string) => ({
    x: direction === 'next' ? -1000 : 1000,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.5 },
  }),
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Card = styled(motion.div)`
  cursor: pointer;
  position: absolute;
  width: 30rem;
  height: 90vh;
  background-color: #000;
  border-radius: 4vmin;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10vmin;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`;

const PrevButton = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: -10%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  cursor: pointer;

  width: 1.5rem;
  height: 1.5rem;
  font-size: 1rem;
  background-color: #c2c2c2;
  border-radius: 50%;
`;

const NextButton = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: -10%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  cursor: pointer;

  width: 1.5rem;
  height: 1.5rem;
  font-size: 1rem;
  background-color: #c2c2c2;
  border-radius: 50%;
`;

const CancelButton = styled(motion.div)`
  position: absolute;
  top: 2%;
  right: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  cursor: pointer;

  font-size: 3rem;
  border-radius: 50%;
`;

function StoryPage() {
  const { id } = useParams();

  const [visibleIndex, setVisibleIndex] = useState<number>(Number(id));
  const [story, setStory] = useState<StoryType[]>([]);
  const [first, setFirst] = useState<boolean>(true);
  const [direction, setDirection] = useState<string>('');
  const x = useMotionValue<number>(0);
  const navigate = useNavigate();

  const getData = async () => {
    const res = await baseAxios.get('/story');
    setStory(res.data);
  };

  useEffect(() => {
    getData();
  }, [id]);

  const showNextSlide = () => {
    setFirst(false);
    if (visibleIndex === story.length - 1) return;
    setVisibleIndex((prev) => (prev === story.length - 1 ? prev : prev + 1));
    setDirection('next');
    navigate(`/story/${visibleIndex + 1}`);
  };

  const showPrevSlide = () => {
    setFirst(false);
    if (visibleIndex === 0) return;
    setVisibleIndex((prev) => (prev === 0 ? prev : prev - 1));
    setDirection('prev');
    navigate(`/story/${visibleIndex - 1}`);
  };

  const dataChange = () => {
    getData();
  };

  return (
    <Container>
      <AnimatePresence custom={direction} initial={false}>
        {story?.map(
          (post, index) =>
            index === visibleIndex && (
              <Card
                key={post?.id}
                variants={slideVariants}
                initial={first ? 'first' : 'hidden'}
                animate="visible"
                exit="exit"
                custom={direction} // direction을 custom으로 넘겨줌
                drag="x" // x축으로만 드래그
                dragSnapToOrigin // 원래대로 돌아가는 기능
                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }} // 튕기는 정도
                // whileTap={{ scale: 0.9 }} // 클릭시 작아지는 정도
                dragElastic={false} // 튕기는 정도
                onDrag={(__event, info) => {
                  x.set(info.offset.x); // x값을 업데이트
                }}
                onDragEnd={(__event, info) => {
                  if (
                    info.offset.x < 0 &&
                    Math.abs(info.offset.x) >= window.innerWidth / 4
                  ) {
                    showNextSlide();
                  } else if (
                    info.offset.x > 0 &&
                    info.offset.x >= window.innerWidth / 4
                  ) {
                    showPrevSlide();
                  }
                  x.set(info.point.x);
                }}
              >
                <SwiperBox
                  data={post.content}
                  storyUser={post.userId}
                  dataChange={dataChange}
                />
                {visibleIndex === 0 ? null : (
                  <PrevButton
                    whileTap={{ scale: 0.9 }}
                    onClick={() => showPrevSlide()}
                    exit={{ opacity: 0 }}
                  >
                    {'<'}
                  </PrevButton>
                )}
                {visibleIndex === story.length - 1 ? null : (
                  <NextButton
                    whileTap={{ scale: 0.9 }}
                    onClick={() => showNextSlide()}
                    exit={{ opacity: 0 }}
                  >
                    {'>'}
                  </NextButton>
                )}
              </Card>
            )
        )}
      </AnimatePresence>
      <CancelButton
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/')}
        exit={{ opacity: 0 }}
      >
        X
      </CancelButton>
    </Container>
  );
}

export default StoryPage;
