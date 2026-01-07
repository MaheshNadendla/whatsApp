// export function ChatBubble({ message, image, isSender, time , status }) {
//   const imageWidth = 200;
//   return (
//     <div
//       style={{
//         width: '54vw',
//         display: "flex",
//         justifyContent: isSender ? "flex-end" : "flex-start",
//         marginBottom: "8px",
//         padding: "0 10px",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: isSender ? "#1976d2" : "#d9fdd3",
//           color: isSender ? "white" : "black",
//           maxWidth: "70%",
//           padding: "10px 15px",
//           borderRadius: "16px",
//           borderTopRightRadius: isSender ? "4px" : "16px",
//           borderTopLeftRadius: isSender ? "16px" : "4px",
//           fontSize: "16px",
//           lineHeight: "1.4",
//           wordBreak: "break-word",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "flex-start",
//           gap: "8px",
//           position: "relative",
//         }}
//       >
//         {image && (
//           <img
//             src={image}
//             alt="Chat Image"
//             style={{
//               width: `${imageWidth}px`,
//               height: "auto",
//               borderRadius: "8px",
//               display: "block",
//             }}
//           />
//         )}



// <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "10px" }}>
//   <div style={{ flex: 1, wordBreak: "break-word" }}>{message}</div>
//   <span
//     style={{
//       fontSize: "12px",
//       opacity: 0.7,
//       whiteSpace: "nowrap",
//       alignSelf: "flex-end",
//     }}
//   >
//     {time} {isSender && (status === "sent" ? "✓✓" : "✓")}
//   </span>
// </div>


//       </div>
//     </div>
//   );
// }





export function ChatBubble({ message, image, isSender, time, status }) {
  const imageWidth = 300;

  return (
    <div
      className={`w-[100%] flex ${
        isSender ? "justify-end" : "justify-start"
      } mb-[7px] px-[10px] mt-[3px]`}
    >
      <div
        className={`max-w-[70%] p-[10px] px-[15px] text-[16px] leading-[1.4]
          flex flex-col items-start gap-2 break-all
          rounded-[16px] border
          ${
            isSender
              ? "bg-[#1976d2] text-white border-white rounded-tr-[4px] rounded-tl-[16px]"
              : "bg-[#d9fdd3] text-black border-black/15 rounded-tr-[16px] rounded-tl-[4px]"
          }`}
      >
        {/* Image (optional) */}
        {image && (
          <img
            src={image}
            alt="Chat"
            style={{ width: `${imageWidth}px` }}
            className="h-auto rounded-lg block"
          />
        )}

        {/* Message + Time */}
        {(message || time) && (
          <div
            className={`flex justify-between items-end gap-2 w-full ${
              image ? `max-w-[${imageWidth}px]` : "max-w-full"
            }`}
          >
            {/* Message text */}
            <div className="flex-1 break-words whitespace-pre-wrap">{message}</div>

            {/* Time + Status */}
            <span className="text-[12px] opacity-70 whitespace-nowrap self-end">
              {time} {isSender && (status === "sent" ? "✓✓" : "✓")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
