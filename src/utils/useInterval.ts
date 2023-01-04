import { useEffect, useRef } from "react";

interface IUseInterval {
  (callback: () => void, interval: number): void;
}

const useInterval: IUseInterval = (callback, delay) => {
  const savedCallback = useRef<(() => void) | null>(null);
  // 최근에 들어온 callback을 저장 할 ref를 하나 만든다

  useEffect(() => {
    savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
  }, [callback]);

  useEffect(() => {
    const executeCallback = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const timerId = setInterval(executeCallback, delay);

    return () => clearInterval(timerId);
  }, [delay]);
};
export default useInterval;
/*
interval을 set하고 unmount되기 전에 clearInterval을 해준다.
즉 react의 Lifecycle에 맞게 새로 만든것이다.
*/
