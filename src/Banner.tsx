import { useEffect, useState } from "react";
import left from "./assets/1.png";
import mid from "./assets/3.png";
import right from "./assets/6.png";
import NumberFlow from "@number-flow/react";
import { onValue } from "firebase/database";
import { usersRef } from "./firebase";
import { Button } from "antd";

interface User {
  id?: string;
  mssv: string;
  name: string;
  email: string;
  unit: string;
  isChecked?: boolean;
  isNew?: boolean;
}

const Banner = () => {
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        if (data) {
          // Chuyển object sang mảng:
          const userList = Object.entries(data).map(([id, value]) => ({
            id,
            ...(value as User),
          }));
          setNum(userList.length);
        }
      } else {
        setNum(0);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <header className="h-[calc(100vh/3000*218)] bg-[#FFC850] relative">
        <div className="h-[calc(100vh/3000*218*2)] w-[calc(100vh/3000*218*2)] bg-[#002C99] rounded-r-full -translate-x-[calc(50%-(100vh/3000*26))] -translate-y-1/2 absolute"></div>
        <div className="w-screen h-full flex justify-center items-center gap-[calc(100vh/3000*473)]">
          <div className="bg-[#002C99] w-[calc(100vh/3000*564)] h-[calc(100vh/3000*133)] rounded-[calc(100vh/3000*50)]"></div>
          <div className="bg-[#002C99] w-[calc(100vh/3000*564)] h-[calc(100vh/3000*133)] rounded-[calc(100vh/3000*50)]"></div>
          <div className="bg-[#002C99] w-[calc(100vh/3000*564)] h-[calc(100vh/3000*133)] rounded-[calc(100vh/3000*50)]"></div>
          <div className="bg-[#002C99] w-[calc(100vh/3000*564)] h-[calc(100vh/3000*133)] rounded-[calc(100vh/3000*50)]"></div>
        </div>
      </header>

      <main className="grid grid-cols-[auto_calc(100vh/3000*2360)_auto] h-[calc(100vh/3000*2614)] gap-[calc(100vh/3000*72)] relative">
        <div className="relative">
          <div className="absolute top-[calc(100vh/3000*96)] left-0 w-[calc(100vh/3000*318)] h-[calc(100vh/3000*262)] bg-[#002C99]" />
          <div className="absolute left-[calc(100vh/3000*308)] top-[calc(100vh/3000*350)] w-[calc(100vh/3000*340)] h-[calc(100vh/3000*340)] bg-[#002C99]" />
          <div className="absolute left-[calc(100vh/3000*312)] top-[calc(100vh/3000*690)] w-[calc(100vh/3000*330)] h-[calc(100vh/3000*320)] bg-[#FFC850]" />
          <img
            className="aspect-[1753/1295] absolute bottom-[calc(100vh/3000*210)] w-full"
            src={left}
          />
        </div>
        <div className="w-full h-full flex flex-col items-center">
          <div className="mt-[calc(100vh/3000*169)] ">
            <img src={mid} className="aspect-[1856/645]" />
          </div>
          <div className="mt-[calc(100vh/3000*60)] text-[calc(100vh/3000*180)] bg-[#002C99] rounded-[calc(100vh/3000*29)] flex items-center justify-center px-16">
            <h1 className="text-white font-bold text-[calc(100vh/3000*160)] -translate-y-1 whitespace-nowrap">
              Số người tham dự hiện tại
            </h1>
          </div>
          <div className="flex justify-center my-auto">
            <NumberFlow
              value={num}
              className=" text-[calc(100vh/3000*400)] font-bold text-[#FFC850]"
            />
          </div>
        </div>
        <div>
          <img
            src={right}
            className="aspect-[916/2613] h-full absolute right-0"
          />
        </div>
      </main>
      <footer className="relative h-[calc(100vh/3000*168)] bg-[#FFC850]">
        <div className="h-[calc(100vh/3000*91)] w-[calc(100vh/3000*345)] rounded-full absolute right-[calc(100vh/3000*403)] bg-[#002C99] top-1/2 -translate-y-1/2" />
        <div className="h-[calc(100vh/3000*91)] w-[calc(100vh/3000*345)] rounded-full absolute right-[calc(100vh/3000*972)] bg-[#002C99] top-1/2 -translate-y-1/2" />
        <div className="absolute left-[calc(100vh/3000*248)] overflow-hidden w-[calc(100vw-100vh/3000*248-100vh/3000*1576)] top-1/2 -translate-y-1/2">
          <h1 className="whitespace-nowrap animate-marquee text-[calc(100vh/3000*72)]/[1] font-bold text-[#002C99]">
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
          </h1>
        </div>
      </footer>
    </div>
  );
};

export default Banner;
