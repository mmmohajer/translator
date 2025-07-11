import { useMemo } from "react";
import Div from "@/baseComponents/reusableComponents/Div";

import useDivWidth from "@/hooks/useDivWidth";

const Table = ({ headingData, bodyData, useFullWidth = true }) => {
  const { containerRef, width } = useDivWidth();

  const colWidths = useMemo(() => {
    if (!headingData?.length) return [];
    let baseWidths = headingData.map((col) => col.width);
    if (useFullWidth && width) {
      const minTotal = baseWidths.reduce((a, b) => a + b, 0);
      if (width > minTotal) {
        const extra = width - minTotal;
        const addPerCol = extra / headingData.length;
        return baseWidths.map((w) => Math.max(w, w + addPerCol));
      }
    }
    return baseWidths;
  }, [width, headingData, useFullWidth, useFullWidth]);

  return (
    <>
      <Div ref={containerRef} className="width-per-100">
        <Div>
          <Div type="flex">
            {headingData?.map((col, idx) => (
              <Div
                className="br-all-solid-1 br-black"
                key={col?.identifier}
                style={{ width: `${colWidths[idx]}px` }}
              >
                {col?.display}
              </Div>
            ))}
          </Div>
        </Div>
        <Div>
          {bodyData?.map((row, idx) => (
            <Div type="flex" key={idx}>
              {headingData?.map((col, colIdx) => (
                <Div
                  key={col?.identifier}
                  style={{ width: `${colWidths[colIdx]}px` }}
                  className="br-all-solid-1 br-black"
                >
                  {row[col?.identifier]?.display}
                </Div>
              ))}
            </Div>
          ))}
        </Div>
      </Div>
    </>
  );
};

export default Table;
