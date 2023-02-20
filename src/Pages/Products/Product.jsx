import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../../global.css";


import { fadeIn, staggerContainer } from "../../Components/Motion/Motion";
import {BasicCard} from "../../Components";
import { MyContext } from "../../App";

function Products() {
  const { edited, setEdited, } = useContext(MyContext)
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch(process.env.REACT_APP_BECKEND + "/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data.msg);
        setEdited(false);
      })
      .catch((err) => {
        setData({ data: [] });
        setEdited(false);
      });
  }, [edited]);


  

  return (
    <>
      <div className="products">
        {data ? (
          data.map((item) => (
              <motion.div
                animate={{
                  x: 0,
                  y: 20,
                  scale: 1,
                  rotate: 0,
                }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                key={item.id}
                className="cardsWrapper"
              >
                <motion.div
                  variants={fadeIn("up", "tween", 0.2, 0.4)}
                  className="cards"
                >
                  { BasicCard(item) }
                </motion.div>
              </motion.div>
          ))
        ) : (
          <div>Failed to load data</div>
        )}
      </div>
    </>
  );
}

export default Products;
