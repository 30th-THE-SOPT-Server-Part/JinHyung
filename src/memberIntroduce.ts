import SoptSeasonData from "./domain/SoptSeasonData";
import { safeJsonParse } from "./utils/safeJsonParser";
const json = '{"season": "30", "group": ["YB", "OB"], "part": ["서버", "기획", "디쟌", "안드", "웹", "아요"], "president": "Yeah"}';

const printIntroduce = (thisSeason: any) => {
  thisSeason["parsed"]["part"].map((v: any) => {
    console.log(`솝트 내 파트는 ${v} 파트가 있어요!`)
  })
}

export const memberIntroduce = () => {
    const result = safeJsonParse(SoptSeasonData)(json);
    if (result.hasError) {
      throw new Error("wrong!");
    }
    printIntroduce(result);
};

memberIntroduce();