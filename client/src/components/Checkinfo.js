import styled from "styled-components";
import { IoPaperPlaneSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

const InnerContainer = styled.div`
  /* grid-column: 2 / 12; */
  /* height: max-content; */
  margin-top: 10px;
  /* justify-content: space-between; */
  .checked {
    position: relative;
    color: #fff;
    border-color: #00aeff;
    background-color: #00aeff;
  }

  .checked:after {
    position: absolute;
    z-index: 2;
    top: -15px;
    right: -15px;
    padding: 5px;
    font-size: 70%;
    border-radius: 4px;
    background-color: tomato;
    content: "Selected";
  }
`;

const CheckContainer = styled.div`
  justify-content: space-between;
  /* aspect-ratio: 3 / 1; */
  position: relative;
  flex-direction: column;
  margin-top: 10px;
  float: left;
`;

const TitleContainer = styled.div`
  /* font-size : 1.0rem; */
  /* margin-top: 40px; */
`;

export default function Checkinfo({
  setCheckDetail,
  checkDetail,
  setNowCheckDeatail,
  nowCheckDetail,
}) {
  const [area, setArea] = useState([
    { contents: "서울", checked: false, info: "area" },
    { contents: "경기도", checked: false, info: "area" },
    { contents: "충청도", checked: false, info: "area" },
    { contents: "강원도", checked: false, info: "area" },
    { contents: "경상도", checked: false, info: "area" },
    { contents: "전라도", checked: false, info: "area" },
    { contents: "제주도", checked: false, info: "area" },
  ]);
  const [internet, setInternet] = useState([
    { contents: "가능", checked: false, info: "internet" },
    { contents: "불가", checked: false, info: "internet" },
  ]);
  const [parking, setParking] = useState([
    { contents: "여유", checked: false, info: "parking" },
    { contents: "협소", checked: false, info: "parking" },
  ]);
  const [electronic, setElectronic] = useState([
    { contents: "가능", checked: false, info: "electronic" },
    { contents: "불가", checked: false, info: "electronic" },
  ]);
  const [toilet, setToilet] = useState([
    { contents: "양호", checked: false, info: "toilet" },
    { contents: "불량", checked: false, info: "toilet" },
  ]);

  const [nowArea, setNowArea] = useState(null);
  const [nowInternet, setNowInternet] = useState(null);
  const [nowParking, setNowParking] = useState(null);
  const [nowElectronic, setNowElectronic] = useState(null);
  const [nowToilet, setNowToilet] = useState(null);

  // if (nowCheckDetail) {
  //   setCheckDetail(nowCheckDetail)
  // }

  // if (nowCheckDetail) {
  //   if (nowCheckDetail.area === "서울") {
  //     area[0].checked = true;
  //   } else if (nowCheckDetail.area === "경기도") {
  //     area[1].checked = true;
  //   } else if (nowCheckDetail.area === "충청도") {
  //     area[2].checked = true;
  //   } else if (nowCheckDetail.area === "강원도") {
  //     area[3].checked = true;
  //   } else if (nowCheckDetail.area === "경상도") {
  //     area[4].checked = true;
  //   } else if (nowCheckDetail.area === "전라도") {
  //     area[5].checked = true;
  //   } else if (nowCheckDetail.area === "제주도") {
  //     area[6].checked = true;
  //   }
  //   if (nowCheckDetail.internet === "가능") {
  //     internet[0].checked = true;
  //   } else if (nowCheckDetail.internet === "불가") {
  //     internet[1].checked = true;
  //   }
  //   if (nowCheckDetail.parking === "여유") {
  //     parking[0].checked = true;
  //   } else if (nowCheckDetail.parking === "협소") {
  //     parking[1].checked = true;
  //   }
  //   if (nowCheckDetail.electronic === "가능") {
  //     electronic[0].checked = true;
  //   } else if (nowCheckDetail.electronic === "불가") {
  //     electronic[1].checked = true;
  //   }
  //   if (nowCheckDetail.toilet === "양호") {
  //     toilet[0].checked = true;
  //   } else if (nowCheckDetail.toilet === "불량") {
  //     toilet[0].checked = true;
  //   }
  //   setNowCheckDeatail(null)
  // }

  // const [checkData, setCheckData] = ({
  //   area: nowArea,
  //   internet: nowInternet,
  //   parking: nowParking,
  //   electronic: nowElectronic,
  //   toilet: nowToilet,
  // })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let checkData = {
    area: nowArea,
    internet: nowInternet,
    parking: nowParking,
    electronic: nowElectronic,
    toilet: nowToilet,
  };

  useEffect(() => {
    setCheckDetail(checkData);
  }, [
    checkData.area,
    checkData.internet,
    checkData.parking,
    checkData.electronic,
    checkData.toilet,
    setCheckDetail,
    checkData,
  ]);

  const handleChange = (data) => {
    if (data.info === "area") {
      const copyProducts = [...area];
      const modifiedProducts = copyProducts.map((area) => {
        if (data.contents === area.contents) {
          area.checked = !area.checked;
        }
        return area;
      });
      setNowArea(data.contents);
      setArea(modifiedProducts);
    }

    if (data.info === "internet") {
      const copyProducts = [...internet];
      const modifiedProducts = copyProducts.map((internet) => {
        if (data.contents === internet.contents) {
          internet.checked = !internet.checked;
        }
        return internet;
      });
      setNowInternet(data.contents);
      setInternet(modifiedProducts);
    }

    if (data.info === "parking") {
      const copyProducts = [...parking];
      const modifiedProducts = copyProducts.map((parking) => {
        if (data.contents === parking.contents) {
          parking.checked = !parking.checked;
        }
        return parking;
      });
      setNowParking(data.contents);
      setParking(modifiedProducts);
    }

    if (data.info === "electronic") {
      const copyProducts = [...electronic];
      const modifiedProducts = copyProducts.map((electronic) => {
        if (data.contents === electronic.contents) {
          electronic.checked = !electronic.checked;
        }
        return electronic;
      });
      setNowElectronic(data.contents);
      setElectronic(modifiedProducts);
    }

    if (data.info === "toilet") {
      const copyProducts = [...toilet];
      const modifiedProducts = copyProducts.map((toilet) => {
        if (data.contents === toilet.contents) {
          toilet.checked = !toilet.checked;
        }
        return toilet;
      });
      setNowToilet(data.contents);
      setToilet(modifiedProducts);
    }
  };

  return (
    <div>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>
        <IoPaperPlaneSharp /> 지역
      </TitleContainer>

      {area &&
        area.map((area, idx) => (
          <CheckContainer key={idx}>
            <input
              type="checkbox"
              className="custom-control-input"
              checked={area.checked}
              onChange={() => {
                handleChange(area);
              }}
            />
            <label className="custom-control-label">
              {area.contents}
              {/* {checkData.area} */}
            </label>
            {/* </div> */}
          </CheckContainer>
        ))}

      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>

      <TitleContainer>
        <IoPaperPlaneSharp /> 인터넷
      </TitleContainer>

      {internet &&
        internet.map((internet, idx) => (
          <CheckContainer key={idx}>
            <input
              type="checkbox"
              className="custom-control-input"
              checked={internet.checked}
              onChange={() => {
                handleChange(internet);
              }}
            />
            <label className="custom-control-label">{internet.contents}</label>
          </CheckContainer>
        ))}
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>

      <TitleContainer>
        <IoPaperPlaneSharp /> 주차장 공간
      </TitleContainer>
      {parking &&
        parking.map((parking, idx) => (
          <CheckContainer key={idx}>
            <input
              type="checkbox"
              className="custom-control-input"
              checked={parking.checked}
              onChange={() => {
                handleChange(parking);
              }}
            />
            <label className="custom-control-label">{parking.contents}</label>
          </CheckContainer>
        ))}
      <InnerContainer> </InnerContainer>

      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>

      <InnerContainer> </InnerContainer>
      <TitleContainer>
        <IoPaperPlaneSharp /> 전기 사용
      </TitleContainer>
      {electronic &&
        electronic.map((electronic, idx) => (
          <CheckContainer key={idx}>
            <input
              type="checkbox"
              className="custom-control-input"
              checked={electronic.checked}
              onChange={() => {
                handleChange(electronic);
              }}
            />
            <label className="custom-control-label">
              {electronic.contents}
            </label>
          </CheckContainer>
        ))}
      <InnerContainer> </InnerContainer>

      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>

      <TitleContainer>
        <IoPaperPlaneSharp /> 화장실 상태
      </TitleContainer>
      {toilet &&
        toilet.map((toilet, idx) => (
          <CheckContainer key={idx}>
            <input
              type="checkbox"
              className="custom-control-input"
              checked={toilet.checked}
              onChange={() => {
                handleChange(toilet);
              }}
            />
            <label className="custom-control-label">{toilet.contents}</label>
          </CheckContainer>
        ))}
      <InnerContainer> </InnerContainer>
      <TitleContainer>&nbsp;</TitleContainer>
    </div>
  );
}
