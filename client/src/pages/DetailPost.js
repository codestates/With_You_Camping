import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  BsPencilSquare,
  BsGeoAltFill,
  BsMapFill,
  BsFillChatDotsFill,
  BsQuestionLg,
} from "react-icons/bs";
import { FaSearchLocation, FaCommentDots } from "react-icons/fa";
import { MdPersonPin } from "react-icons/md";
import { DetailBtnComponent as Btn } from "../components/DetailBtnComponent";

import sample from "../img/sample.jpeg";
import StarRating from "../components/starRating";
import markerImg from "../img/marker.png";
import TagComponent from "../components/TagComponent";
import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  height: max-content;

  section {
    margin-bottom: 20px;
  }

  .wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  .category {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

const InnerContainer = styled.div`
  position: relative;
  grid-column: 2 / 12;
  height: max-content;
`;
const TitleContainer = styled.div`
  float: right;
  width: 45%;
  border-left-width: 5%;
  text-align: center;
  /* padding-top: 10px; */
  font-family: "Sriracha", cursive;
  font-size: 1.9rem;
`;

const HeartButton = styled.div`
  text-align: right;
  margin-bottom: 50px;
  font-size: 1.8rem;
  .fas {
    &:hover{
    transform: translateY(-2px);
    box-shadow: 0px 5px 4px rgba(0,0,0,0.1);
    /* background-color: ${props => props.hover ? `${props.hover}` : null}; */
  }
  }
`;

const TagContainer = styled.section`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 10px;
  font-size: 0.8rem;
  justify-content: space-between;

  width: 100%;
  min-height: 50px;
  height: max-content;
  margin-top: 50px;

  .tag_none {
    position: absolute;
    top: calc(50% - 15px);

    width: 160px;

    color: #888;
    text-align: center;
  }
`;

const ModifyBtn = styled.div`
  position: absolute;
  right: 0;
  top: -31px;

  display: flex;
  align-items: center;

  width: max-content;
  height: 30px;

  transition: 0.1s;

  cursor: pointer;

  font-size: 0.9rem;
  color: #777;

  span {
    position: relative;
    top: 1px;
    margin-right: 6px;
  }

  &:hover {
    transform: translateY(-2px);
    color: #000;
  }

  @media screen and (max-width: 500px) {
    top: -60px;
  }
`;

const ImgContainer = styled.section`
  display: grid;
  place-items: center;

  aspect-ratio: 1.5 / 1;
  width: 50%;
  /* float: left; */

  background: ${(props) => `url(${props.img})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);

  border-radius: 10px;

  @media screen and (max-width: 500px) {
    aspect-ratio: 1 / 1;
  }
`;

const LocationLink = styled.div`
  position: absolute;

  right: 20px;
  bottom: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: max-content;
  height: 1.5rem;
  padding: 0 6px;

  background-color: #fff;
  border-radius: 1.5rem;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);

  color: #666;

  z-index: 2;

  cursor: pointer;

  .wrapper span {
    position: relative;
    top: 2px;

    font-size: 0.9rem;
  }

  .wrapper svg {
    margin-right: 5px;
  }

  transition: 0.1s;

  &:hover {
    background-color: #ffd600;
    color: #000;
  }
`;

const DescContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 50px;
  max-height: 500px;

  box-sizing: border-box;

  font-family: sans-serif;

  .title_wrapper {
    color: #333;
    font-size: 1.4rem;
    display: flex;

    margin-top: 30px;
    margin-bottom: 10px;

    svg {
      position: relative;
      top: -2px;

      margin-right: 5px;
      color: #333;
    }
    .nickname {
      font-size: 1.2rem;
    }
    .createdAt {
      font-size: 0.7rem;
    }
  }

  pre {
    min-height: 20px;
    padding: 10px;
    border-left: 3px solid #27dbb7;
    border-radius: 3px;
    white-space: pre-wrap;
    line-height: 1.4rem;
    margin-top: 15px;
  }
`;

const MapContainer = styled.section`
  .title_wrapper {
    color: #333;

    display: flex;

    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 1.2rem;
    svg {
      position: relative;
      top: -2px;

      margin-right: 5px;
      color: #333;
    }
  }
`;
const KakaoMap = styled.section`
  width: 70%;
  aspect-ratio: 2 / 1;

  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);

  border-radius: 10px;

  @media screen and (max-width: 500px) {
    height: 150px;
  }
`;

const CommentContainer = styled.section`
  width: 100%;
  min-height: 300px;
  height: max-content;

  .title_wrapper {
    color: #333;

    display: flex;

    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 1.2rem;

    svg {
      position: relative;
      top: -2px;

      margin-right: 5px;
      color: #333;
    }
  }

  @media screen and (max-width: 500px) {
    .title_wrapper {
      margin-bottom: 0px;
    }
  }
`;

const WeatherContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 50px;
  max-height: 500px;

  box-sizing: border-box;

  font-family: sans-serif;

  .title_wrapper {
    color: #333;

    display: flex;

    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
`;

const ModifyBtnContainer = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: space-between;
  /* margin-left: 5% */
  /* margin-bottom: px; */
`;

const DeleteBtnContainer = styled.div`
  /* margin-top: 5px; */
`;

export default function DetailPost() {
  const kakao = window.kakao;

  const [interestIconColor, setInterestIconColor] = useState("#cccccc");
  // const serverPath = process.env.REACT_APP_SERVER_PATH;
  // const loginToken = window.sessionStorage.getItem('loginToken')
  // const userId = window.sessionStorage.getItem('userId')

  const [tags, setTags] = useState([
    "서울",
    "인터넷가능",
    "주차장협소",
    "전기사용",
    "화장실청결",
  ]);
  const [description, setDesctription] = useState("가족끼리 갔다오기 좋아요");

  const [isLoading, setIsLoading] = useState(false);

  const [coords, setCoords] = useState([]);

  const [showOnMap, setShowOnMap] = useState(false);

  // {latitude: '38.090059123185654', longitude: '128.65646297602729'}
  // {roadAdd: '강원도 양양군 손양면 동명로 321-20', lotAdd: '강원 양양군 손양면 송전리 산 1-5'}

  // 지도 데이터 세팅
  useEffect(() => {
    setCoords({
      latitude: "38.090059123185654",
      longitude: "128.65646297602729",
      roadAdd: "강원도 양양군 손양면 동명로 321-20",
    });
  }, []);

  const kakaoMap = useRef();
  // useEffect(() => {
  //   (async () => {
  //     setIsLoading(true)
  //     try {
  //       const res = await axios.get(`${serverPath}/api/posts/${params.id}`)
  //       const post = res.data.post

  //       setPostData(post)
  //       setCoords(post.location)
  //       setTags(
  //         [...post.hashtags.keywords, ...post.hashtags.myTags]
  //           .sort((a, b) => a < b ? - 1 : (a === b) ? 0 : 1)
  //       )
  //     } catch (err) {
  //       //err
  //     }
  //     setIsLoading(false)
  //   })()
  // }, [])

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      const imageSrc = markerImg, // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(50, 45), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(13, 38) };

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(coords.latitude, coords.longitude),
        image: markerImage,
      });

      const staticMapContainer = kakaoMap.current, // 이미지 지도를 표시할 div
        staticMapOption = {
          center: new kakao.maps.LatLng(coords.latitude, coords.longitude), // 이미지 지도의 중심좌표
          level: 3, // 이미지 지도의 확대 레벨
        };

      const map = new kakao.maps.Map(staticMapContainer, staticMapOption);
      map.setDraggable(false);
      map.setZoomable(false);

      marker.setMap(map);
    }
  }, [coords]);

  const openKakaoMap = () => {
    const address = coords.roadAdd ? coords.roadAdd : coords.lotAdd;
    window.open(
      `https://map.kakao.com/link/map/${address},${coords.latitude},${coords.longitude}`
    );
  };

  const checkLoginStatus = (callback) => {
    callback();
    // if (isLogin) {
    //   callback();
    // } else {
    //   dispatch(setLoginModal(true));
    // }
    // return;
  };

  const interestPost = () => {
    if (interestIconColor === "#cccccc") {
      setInterestIconColor("#e8b791");
    } else {
      setInterestIconColor("#cccccc");
    }
    /* if (interestIconColor === "#cccccc") {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/interests`,
          {
            // id: post.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          }
        )
        .then(() => {
          setInterestIconColor("#d62d20");
        })
        .catch((err) => {
          if (err) throw err;
        });
    } else {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/interests`, {
          data: {
            // id: post.id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        })
        .then(() => {
          setInterestIconColor("#cccccc");
        });
    } */
  };

  return (
    <Container>
      <InnerContainer>
        <TitleContainer>
          <HeartButton>
            <div className="heart">
            <i
              className="fas fa-heart fa-lg"
              style={{
                color: `${interestIconColor}`,
              }}
              onClick={() => checkLoginStatus(interestPost)}
            />
            </div>
            
          </HeartButton>

          <div className="title">양양 오토 캠핑장 괜찮네요~</div>

          <div className="wrapper">
            <TagContainer>
              {tags.length ? (
                tags.map((tag, idx) => (
                  <TagComponent key={idx}>{tag}</TagComponent>
                ))
              ) : (
                <p className="tag_none">설정된 태그가 없습니다.</p>
              )}
            </TagContainer>

            {/* <ToggleLikeBtn likeStat={likeStat} /> */}
          </div>
          <StarRating />
        </TitleContainer>
        <ImgContainer img={sample}></ImgContainer>

        {description && (
          <DescContainer>
            <div className="title_wrapper">
              <MdPersonPin />
              <h3 className="nickname"> 캠핑사랑 님의 게시글</h3>
            </div>
            <hr />
            <div className="createdAt"> (2022-02-03) </div>
            <pre>{description}</pre>
          </DescContainer>
        )}

        <MapContainer>
          <div className="title_wrapper">
            <BsGeoAltFill />
            <h3>캠핑 장소</h3>
          </div>
          <hr />
          <KakaoMap ref={kakaoMap}>
            <LocationLink
              onClick={openKakaoMap}
              onMouseOver={() => setShowOnMap(true)}
              onMouseLeave={() => setShowOnMap(false)}
            >
              {showOnMap ? (
                <div className="wrapper">
                  <BsMapFill />
                  <span>카카오 지도에서 보기</span>
                </div>
              ) : (
                <div className="wrapper">
                  <BsGeoAltFill />
                  <span>{coords.roadAdd ? coords.roadAdd : coords.lotAdd}</span>
                </div>
              )}
            </LocationLink>
          </KakaoMap>
        </MapContainer>

        <WeatherContainer>
          <div className="title_wrapper">
            <FaSearchLocation />
            <h3 className="nickname">이 지역의 날씨는?</h3>
            &nbsp; &nbsp;
            <span style={{ fontSize: "1.1rem" }}> {coords.roadAdd}</span>
          </div>
          <hr />
        </WeatherContainer>

        <CommentContainer>
          <div className="title_wrapper">
            <FaCommentDots />
            <h3>댓글</h3>
          </div>
          <hr />
          <CommentList />
          <CommentInput />
        </CommentContainer>

        <ModifyBtnContainer>
          <Btn width={"100%"} color={"#ddd"} hover={"#bde0bc"}>
            수정하기
          </Btn>
          <Btn width={"100%"} color={"#ddd"} hover={"#e99358"}>
            삭제하기
          </Btn>
        </ModifyBtnContainer>

        {/* <ModifyBtn >
        <span>게시글 수정하기</span>
              <BsPencilSquare />
        </ModifyBtn> */}
      </InnerContainer>
    </Container>
  );
}
