import {useEffect, useRef} from "react";
import {usePrevious} from "./usePrevious";

export const usePreviousList = (arr) => {
  const ref = useRef();
  const prevArr = usePrevious(arr)
  useEffect(() => {
    ref.current = arr.map((elem, index) => elem !== prevArr[index]);
  }, [arr, prevArr]);
  return ref.current;
};