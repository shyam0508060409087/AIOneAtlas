"use client";

export default function AmbientBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Violet — top left */}
      <div
        className="ambient-orb"
        style={{
          width: "700px",
          height: "700px",
          top: "-250px",
          left: "-150px",
          background: "radial-gradient(circle, rgba(255,102,0,0.22) 0%, transparent 65%)",
          animation: "orbFloat 16s ease-in-out infinite",
        }}
      />
      {/* Teal — mid right */}
      <div
        className="ambient-orb"
        style={{
          width: "500px",
          height: "500px",
          top: "35%",
          right: "-180px",
          background: "radial-gradient(circle, rgba(255,102,0,0.12) 0%, transparent 65%)",
          animation: "orbFloat 20s ease-in-out infinite",
          animationDelay: "-5s",
        }}
      />
      {/* Violet — bottom center */}
      <div
        className="ambient-orb"
        style={{
          width: "600px",
          height: "600px",
          bottom: "-200px",
          left: "25%",
          background: "radial-gradient(circle, rgba(255,102,0,0.14) 0%, transparent 65%)",
          animation: "orbFloat 18s ease-in-out infinite",
          animationDelay: "-10s",
        }}
      />
      {/* Pink — mid right lower */}
      <div
        className="ambient-orb"
        style={{
          width: "300px",
          height: "300px",
          top: "60%",
          left: "60%",
          background: "radial-gradient(circle, rgba(255,102,0,0.08) 0%, transparent 65%)",
          animation: "orbFloat 22s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}
