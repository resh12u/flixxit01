import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/PayCard.css";
import { hideLoader, showLoader } from "./common_functions";
import ReactDOM from "react-dom/client";

export default function PayCard(props) {
  const [cur, setCur] = useState(0);

  const GetCurrentView = () => {
    if (cur == 0) {
      return (
        <>
          <Box sx={{ fontSize: "1.5vh", mt: "1.5vh" }}>Name on Card</Box>
          <Box sx={{ fontSize: "1.5vh", mt: "0.6vh" }}>
            <TextField
              className="textfeild"
              defaultValue={"Joshua Alex"}
              sx={{
                input: {
                  fontSize: "1.6vh !important",
                  p: "1.3vh 2vh",
                },
              }}
            />
          </Box>
          <Box sx={{ fontSize: "1.5vh", mt: "1.5vh" }}>Card Number</Box>
          <Box sx={{ fontSize: "1.5vh", mt: "0.6vh" }}>
            <TextField
              className="textfeild"
              defaultValue={"2220-XXXX-XXXX-0906"}
              sx={{
                input: {
                  fontSize: "1.6vh !important",
                  p: "1.3vh 2vh",
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Box>
              <Box sx={{ fontSize: "1.5vh", mt: "1.5vh" }}>Expires on</Box>
              <Box sx={{ fontSize: "1.5vh", mt: "0.6vh" }}>
                <TextField
                  className="textfeild"
                  placeholder="MM/YY"
                  defaultValue={"00/00"}
                  sx={{
                    input: {
                      fontSize: "1.6vh !important",
                      p: "1.3vh 2vh",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Box sx={{ fontSize: "1.5vh", mt: "1.5vh" }}>
                Security Code (CVV)
              </Box>
              <Box sx={{ fontSize: "1.5vh", mt: "0.6vh" }}>
                <TextField
                  className="textfeild"
                  placeholder="CVV"
                  type="password"
                  defaultValue={"123"}
                  sx={{
                    input: {
                      fontSize: "1.6vh !important",
                      p: "1.3vh 2vh",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </>
      );
    }
  };
  const id =
    localStorage.getItem("userdet") &&
    JSON.parse(localStorage.getItem("userdet"))._id;
  const initializePayment = async () => {
    console.log("payment initialized");
    showLoader();
    setTimeout(async () => {
      await axios
        .put(
          process.env.REACT_APP_BACKEND_URL + "/users/" + id + "/subscription"
        )
        .then((res) => {
          localStorage.setItem("userdet", JSON.stringify(res.data));
          document.getElementById("paymentCard").style.display = "none";
          hideLoader();
          props.setUpdate();
          const div = document.getElementById("payCard");
          const root = ReactDOM.createRoot(div);
          root.render();
          // window.location.reload()
        })
        .catch((er) => {
          hideLoader();
          toast.error("Payment Failed from Backend");
          console.log(er);
        });
    }, 2000);
  };
  useEffect(() => {}, []);
  return (
    <Box
      className="flexcenter"
      id="paymentCard"
      sx={{
        zIndex: "10",
        backgroundColor: "#a4a4cb75",
        position: "absolute",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box sx={{ position: "fixed", display: "none" }}>
        <input id="useMeAsVessel"></input>
      </Box>
      <Box
        sx={{ width: "60vw", backgroundColor: "white", borderRadius: "5px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "100%",
              p: "4.5vh 5.6vh",
              borderRadius: "5px 0 0 5px",
            }}
          >
            <Box
              sx={{ fontSize: "2.6vh", color: "#090D28", fontWeight: "600" }}
            >
              Add Card
              <br />
              <Box style={{ fontSize: "1.6vh", color: "red" }}>
                Do not enter your details, please click on "continue payment"
              </Box>
            </Box>
            {/* <Box sx={{ fontSize: '1.5vh', color: '#090D28', fontWeight: '400' }}>Enter your payment info below</Box> */}
            <Box sx={{ fontSize: "1.5vh", mt: "2vh" }}>Payment Method</Box>
            <Box sx={{ display: "flex", gap: "16px", mt: "1vh" }}>
              <Box
                onClick={() => {
                  setCur(0);
                }}
                sx={{
                  cursor: "pointer",
                  width: "100%",
                  border: `1px solid ${
                    cur == 0 ? "var(--highlight-color)" : "#C2C2C2"
                  }`,
                  p: "1.5vh",
                  borderRadius: "5px",
                  display: "flex",
                }}
              >
                <svg
                  style={{ width: "100%" }}
                  width="81"
                  height="15"
                  viewBox="0 0 81 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M68.5337 11.0174H66.7516L67.8663 4.125H69.6483L68.5337 11.0174Z"
                    fill="#00579F"
                  />
                  <path
                    d="M74.9936 4.29344C74.6421 4.15398 74.0846 4 73.3952 4C71.6352 4 70.3959 4.93849 70.3883 6.28024C70.3737 7.27019 71.2756 7.82003 71.9502 8.15011C72.6397 8.4874 72.8741 8.70755 72.8741 9.0082C72.8671 9.46994 72.3169 9.68278 71.8038 9.68278C71.0923 9.68278 70.7111 9.57304 70.1317 9.31615L69.897 9.20603L69.6476 10.7532C70.0656 10.9436 70.8357 11.1126 71.6352 11.12C73.5052 11.12 74.7226 10.1961 74.737 8.76622C74.7441 7.98161 74.2679 7.38041 73.2411 6.88914C72.6178 6.57378 72.236 6.36113 72.236 6.03846C72.2433 5.74512 72.5589 5.44467 73.2625 5.44467C73.8419 5.42995 74.2676 5.56922 74.5901 5.70858L74.7512 5.78176L74.9936 4.29344Z"
                    fill="#00579F"
                  />
                  <path
                    d="M77.3624 8.57566C77.5092 8.1797 78.074 6.64722 78.074 6.64722C78.0666 6.66194 78.2204 6.24396 78.3084 5.98736L78.433 6.58125C78.433 6.58125 78.7705 8.23106 78.8438 8.57566C78.5652 8.57566 77.7145 8.57566 77.3624 8.57566ZM79.5623 4.125H78.1838C77.7587 4.125 77.4357 4.24955 77.2523 4.69686L74.6052 11.0173H76.4751C76.4751 11.0173 76.783 10.1666 76.8492 9.98339C77.0543 9.98339 78.8734 9.98339 79.1373 9.98339C79.1885 10.2254 79.3499 11.0173 79.3499 11.0173H81L79.5623 4.125Z"
                    fill="#00579F"
                  />
                  <path
                    d="M65.2627 4.125L63.5173 8.82495L63.3266 7.87174C63.0039 6.77187 61.992 5.57688 60.8627 4.9827L62.4613 11.0101H64.3459L67.1471 4.125H65.2627Z"
                    fill="#00579F"
                  />
                  <path
                    d="M61.8966 4.125H59.0293L59 4.26426C61.2367 4.83622 62.718 6.21492 63.3266 7.87203L62.7033 4.70437C62.6007 4.26417 62.2853 4.13952 61.8966 4.125Z"
                    fill="#FAA61A"
                  />
                  <path
                    d="M47.0616 3.37109H42.9279V10.7994H47.0616V3.37109Z"
                    fill="#FF5F00"
                  />
                  <path
                    d="M43.1907 7.08552C43.19 6.37012 43.3521 5.66395 43.6648 5.02046C43.9774 4.37698 44.4323 3.81305 44.995 3.37136C44.2981 2.82357 43.4612 2.48291 42.5798 2.38831C41.6984 2.29371 40.8082 2.44899 40.0109 2.83641C39.2136 3.22383 38.5414 3.82775 38.0711 4.57914C37.6008 5.33054 37.3514 6.19909 37.3514 7.08552C37.3514 7.97196 37.6008 8.84051 38.0711 9.5919C38.5414 10.3433 39.2136 10.9472 40.0109 11.3346C40.8082 11.7221 41.6984 11.8773 42.5798 11.7827C43.4612 11.6881 44.2981 11.3475 44.995 10.7997C44.4323 10.358 43.9774 9.79406 43.6648 9.15058C43.3522 8.50709 43.19 7.80092 43.1907 7.08552Z"
                    fill="#EB001B"
                  />
                  <path
                    d="M52.6383 7.08552C52.6383 7.97194 52.3889 8.84049 51.9186 9.59188C51.4484 10.3433 50.7762 10.9472 49.9789 11.3346C49.1816 11.722 48.2915 11.8773 47.4101 11.7827C46.5287 11.6881 45.6918 11.3475 44.9949 10.7997C45.5572 10.3575 46.0117 9.79353 46.3243 9.15014C46.6368 8.50676 46.7992 7.80081 46.7992 7.08552C46.7992 6.37023 46.6368 5.66428 46.3243 5.0209C46.0117 4.37751 45.5572 3.81349 44.9949 3.37136C45.6918 2.82357 46.5287 2.48291 47.4101 2.38831C48.2915 2.29371 49.1816 2.449 49.9789 2.83642C50.7762 3.22384 51.4484 3.82776 51.9186 4.57916C52.3889 5.33055 52.6383 6.1991 52.6383 7.08552Z"
                    fill="#F79E1B"
                  />
                  <path
                    d="M52.1879 10.0134V9.86136H52.2493V9.83038H52.0931V9.86136H52.1544V10.0134H52.1879ZM52.4911 10.0134V9.83008H52.4433L52.3882 9.9562L52.3331 9.83008H52.2852V10.0134H52.319V9.87513L52.3707 9.99438H52.4057L52.4574 9.87483V10.0134H52.4911Z"
                    fill="#F79E1B"
                  />
                  <path
                    d="M0.43 7.51C0.43 6.83 0.583333 6.22 0.89 5.68C1.19667 5.13333 1.61333 4.70667 2.14 4.4C2.67333 4.09333 3.26333 3.94 3.91 3.94C4.67 3.94 5.33333 4.12333 5.9 4.49C6.46667 4.85667 6.88 5.37667 7.14 6.05H6.05C5.85667 5.63 5.57667 5.30667 5.21 5.08C4.85 4.85333 4.41667 4.74 3.91 4.74C3.42333 4.74 2.98667 4.85333 2.6 5.08C2.21333 5.30667 1.91 5.63 1.69 6.05C1.47 6.46333 1.36 6.95 1.36 7.51C1.36 8.06333 1.47 8.55 1.69 8.97C1.91 9.38333 2.21333 9.70333 2.6 9.93C2.98667 10.1567 3.42333 10.27 3.91 10.27C4.41667 10.27 4.85 10.16 5.21 9.94C5.57667 9.71333 5.85667 9.39 6.05 8.97H7.14C6.88 9.63667 6.46667 10.1533 5.9 10.52C5.33333 10.88 4.67 11.06 3.91 11.06C3.26333 11.06 2.67333 10.91 2.14 10.61C1.61333 10.3033 1.19667 9.88 0.89 9.34C0.583333 8.8 0.43 8.19 0.43 7.51ZM8.15461 8.24C8.15461 7.68 8.26794 7.19 8.49461 6.77C8.72128 6.34333 9.03128 6.01333 9.42461 5.78C9.82461 5.54667 10.2679 5.43 10.7546 5.43C11.2346 5.43 11.6513 5.53333 12.0046 5.74C12.3579 5.94667 12.6213 6.20667 12.7946 6.52V5.52H13.7146V11H12.7946V9.98C12.6146 10.3 12.3446 10.5667 11.9846 10.78C11.6313 10.9867 11.2179 11.09 10.7446 11.09C10.2579 11.09 9.81794 10.97 9.42461 10.73C9.03128 10.49 8.72128 10.1533 8.49461 9.72C8.26794 9.28667 8.15461 8.79333 8.15461 8.24ZM12.7946 8.25C12.7946 7.83667 12.7113 7.47667 12.5446 7.17C12.3779 6.86333 12.1513 6.63 11.8646 6.47C11.5846 6.30333 11.2746 6.22 10.9346 6.22C10.5946 6.22 10.2846 6.3 10.0046 6.46C9.72461 6.62 9.50128 6.85333 9.33461 7.16C9.16794 7.46667 9.08461 7.82667 9.08461 8.24C9.08461 8.66 9.16794 9.02667 9.33461 9.34C9.50128 9.64667 9.72461 9.88333 10.0046 10.05C10.2846 10.21 10.5946 10.29 10.9346 10.29C11.2746 10.29 11.5846 10.21 11.8646 10.05C12.1513 9.88333 12.3779 9.64667 12.5446 9.34C12.7113 9.02667 12.7946 8.66333 12.7946 8.25ZM16.1624 6.41C16.3224 6.09667 16.5491 5.85333 16.8424 5.68C17.1424 5.50667 17.5058 5.42 17.9324 5.42V6.36H17.6924C16.6724 6.36 16.1624 6.91333 16.1624 8.02V11H15.2524V5.52H16.1624V6.41ZM18.6429 8.24C18.6429 7.68 18.7562 7.19 18.9829 6.77C19.2096 6.34333 19.5196 6.01333 19.9129 5.78C20.3129 5.54667 20.7596 5.43 21.2529 5.43C21.6796 5.43 22.0762 5.53 22.4429 5.73C22.8096 5.92333 23.0896 6.18 23.2829 6.5V3.6H24.2029V11H23.2829V9.97C23.1029 10.2967 22.8362 10.5667 22.4829 10.78C22.1296 10.9867 21.7162 11.09 21.2429 11.09C20.7562 11.09 20.3129 10.97 19.9129 10.73C19.5196 10.49 19.2096 10.1533 18.9829 9.72C18.7562 9.28667 18.6429 8.79333 18.6429 8.24ZM23.2829 8.25C23.2829 7.83667 23.1996 7.47667 23.0329 7.17C22.8662 6.86333 22.6396 6.63 22.3529 6.47C22.0729 6.30333 21.7629 6.22 21.4229 6.22C21.0829 6.22 20.7729 6.3 20.4929 6.46C20.2129 6.62 19.9896 6.85333 19.8229 7.16C19.6562 7.46667 19.5729 7.82667 19.5729 8.24C19.5729 8.66 19.6562 9.02667 19.8229 9.34C19.9896 9.64667 20.2129 9.88333 20.4929 10.05C20.7729 10.21 21.0829 10.29 21.4229 10.29C21.7629 10.29 22.0729 10.21 22.3529 10.05C22.6396 9.88333 22.8662 9.64667 23.0329 9.34C23.1996 9.02667 23.2829 8.66333 23.2829 8.25ZM27.6807 11.09C27.2607 11.09 26.884 11.02 26.5507 10.88C26.2174 10.7333 25.954 10.5333 25.7607 10.28C25.5674 10.02 25.4607 9.72333 25.4407 9.39H26.3807C26.4074 9.66333 26.534 9.88667 26.7607 10.06C26.994 10.2333 27.2974 10.32 27.6707 10.32C28.0174 10.32 28.2907 10.2433 28.4907 10.09C28.6907 9.93667 28.7907 9.74333 28.7907 9.51C28.7907 9.27 28.684 9.09333 28.4707 8.98C28.2574 8.86 27.9274 8.74333 27.4807 8.63C27.074 8.52333 26.7407 8.41667 26.4807 8.31C26.2274 8.19667 26.0074 8.03333 25.8207 7.82C25.6407 7.6 25.5507 7.31333 25.5507 6.96C25.5507 6.68 25.634 6.42333 25.8007 6.19C25.9674 5.95667 26.204 5.77333 26.5107 5.64C26.8174 5.5 27.1674 5.43 27.5607 5.43C28.1674 5.43 28.6574 5.58333 29.0307 5.89C29.404 6.19667 29.604 6.61667 29.6307 7.15H28.7207C28.7007 6.86333 28.584 6.63333 28.3707 6.46C28.164 6.28667 27.884 6.2 27.5307 6.2C27.204 6.2 26.944 6.27 26.7507 6.41C26.5574 6.55 26.4607 6.73333 26.4607 6.96C26.4607 7.14 26.5174 7.29 26.6307 7.41C26.7507 7.52333 26.8974 7.61667 27.0707 7.69C27.2507 7.75667 27.4974 7.83333 27.8107 7.92C28.204 8.02667 28.524 8.13333 28.7707 8.24C29.0174 8.34 29.2274 8.49333 29.4007 8.7C29.5807 8.90667 29.674 9.17667 29.6807 9.51C29.6807 9.81 29.5974 10.08 29.4307 10.32C29.264 10.56 29.0274 10.75 28.7207 10.89C28.4207 11.0233 28.074 11.09 27.6807 11.09Z"
                    fill="black"
                  />
                </svg>
                {cur == 0 ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="16" height="16" rx="8" fill="#324FF6" />
                    <path
                      d="M4.44446 8.31416L7.0251 10.6671L11.5556 6.22266"
                      stroke="url(#paint0_linear_1640_7265)"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1640_7265"
                        x1="8.00001"
                        y1="6.27516"
                        x2="7.85745"
                        y2="10.4439"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="white" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.75"
                      y="0.75"
                      width="14.5"
                      height="14.5"
                      rx="7.25"
                      stroke="#6B6F86"
                      stroke-width="1.5"
                    />
                  </svg>
                )}
              </Box>
            </Box>
            <GetCurrentView />
            <Box className="flexcenter" sx={{ p: "2vh", gap: "100px" }}>
              <Button
                onClick={() => {
                  initializePayment();
                }}
                className="auth-button"
                sx={{ p: "1vh 4vh", textTransform: "none" }}
              >
                {"Continue Payment"}
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "#FBFBFB",
              width: "100%",
              flexFlow: "column",
              display: "flex",
              p: "4.5vh 5.6vh",
              borderRadius: "0 5px 5px 0",
            }}
          >
            <svg
              onClick={() => {
                document.getElementById("paymentCard").style.display = "none";
              }}
              style={{ marginLeft: "auto", cursor: "pointer" }}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.5919 9.00019L17.6702 1.92162C18.1099 1.48221 18.1099 0.769247 17.6702 0.329838C17.2304 -0.109946 16.5182 -0.109946 16.0785 0.329838L9.00019 7.40841L1.92154 0.329838C1.48177 -0.109946 0.76959 -0.109946 0.329824 0.329838C-0.109941 0.769247 -0.109941 1.48221 0.329824 1.92162L7.40848 9.00019L0.329824 16.0788C-0.109941 16.5182 -0.109941 17.2311 0.329824 17.6705C0.549707 17.8901 0.837881 18 1.12568 18C1.41348 18 1.70165 17.8901 1.92154 17.6702L9.00019 10.5916L16.0785 17.6702C16.2983 17.8901 16.5865 18 16.8743 18C17.1621 18 17.4503 17.8901 17.6702 17.6702C18.1099 17.2308 18.1099 16.5178 17.6702 16.0784L10.5919 9.00019Z"
                fill="black"
              />
            </svg>
            <Box className="flexcenter" sx={{ height: "100%" }}>
              <Box
                sx={{
                  height: "calc(185px - 5.4vh)",
                  width: "calc(315px - 7vh)",
                  background:
                    "linear-gradient(225deg, #539BEE 0%, #5D75DE 100%)",
                  boxShadow: "0px 2px 9px rgba(74, 144, 226, 0.5)",
                  borderRadius: "10px",
                  display: "flex",
                  flexFlow: "column",
                  fontSize: "1.7vh",
                  justifyContent: "space-between",
                  p: "3.5vh 2.8vh",
                  color: "white",
                }}
              >
                <Box></Box>
                <Box
                  sx={{
                    border: "1px solid white",
                    borderRadius: "5px",
                    p: "1.3vh",
                  }}
                >
                  XXXX XXXX XXXX XXXX
                </Box>
                <Box
                  sx={{
                    opacity: "0.7",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ ml: "1.3vh" }}>CALEB MCGEE</Box>
                  <Box>MM/YY</Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}