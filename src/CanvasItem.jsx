function CanvasItem({ item, i }) {
  return (
    <button
      className="perfume absolute w-48 aspect-4/5 cursor-pointer"
      style={{
        top: `${item.y}%`,
        left: `${item.x}%`,
      }}
      key={`perfume-${i + 1}`}
    >
      <img
        src={`/perfumes/perfume-${i + 1}.jpg`}
        alt={`Perfume ${i + 1}`}
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
      />
    </button>
  );
}

export default CanvasItem;
