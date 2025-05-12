
import { useState } from "react";

const photos = [
  "https://i.ibb.co/mVsKgrZ7/MGK09167.jpg",
  "https://i.ibb.co/8hncZCp/MGK09173.jpg",
  "https://i.ibb.co/fd3W7yGD/MGK09203.jpg",
  "https://i.ibb.co/2YHTxMDx/MGK09207.jpg",
  "https://i.ibb.co/nM69mTD3/MGK09216.jpg",
  "https://i.ibb.co/k2XrXXZS/MGK09223.jpg",
  "https://i.ibb.co/yFLT8YQ1/MGK09228.jpg",
  "https://i.ibb.co/B5jMw8SJ/MGK09232.jpg",
  "https://i.ibb.co/HLhLSDvW/MGK09236.jpg",
  "https://i.ibb.co/b5M5krzJ/MGK09250.jpg",
  "https://i.ibb.co/kgZ3ZfPG/MGK09255.jpg",
  "https://i.ibb.co/Tx5Lyr81/MGK09263.jpg",
  "https://i.ibb.co/1tZKVkxx/MGK09264-Migliorato-NR.jpg",
  "https://i.ibb.co/wFJ1x0Fc/MGK09269.jpg",
  "https://i.ibb.co/nMx6gZbn/MGK09272.jpg",
  "https://i.ibb.co/wqBH9yn/MGK09292-Migliorato-NR.jpg",
  "https://i.ibb.co/jvtpQtpw/MGK09297-Migliorato-NR.jpg",
  "https://i.ibb.co/YV2DB11/MGK09305-Migliorato-SR.jpg",
  "https://i.ibb.co/20DMdcJ3/MGK09316-Migliorato-NR.jpg",
  "https://i.ibb.co/WNL0sWBk/MGK09321-Migliorato-NR.jpg",
  "https://i.ibb.co/99zkGC0C/MGK09331-Migliorato-NR.jpg",
  "https://i.ibb.co/tMZV1Rd4/MGK09348-Migliorato-NR.jpg",
  "https://i.ibb.co/dsxWQQTf/MGK09357-Migliorato-NR.jpg",
  "https://i.ibb.co/wFLL4zYw/MGK09358-Migliorato-NR.jpg",
  "https://i.ibb.co/21ZJRN6k/MGK09405.jpg",
  "https://i.ibb.co/nqDHVRZj/MGK09420.jpg",
  "https://i.ibb.co/Z62Y24Md/MGK09427.jpg",
  "https://i.ibb.co/20ngdXfT/MGK09433.jpg",
  "https://i.ibb.co/k6DNZcck/MGK09440.jpg",
  "https://i.ibb.co/rKGCq9W8/MGK09445.jpg",
  "https://i.ibb.co/fVRpFdbD/MGK09449.jpg",
  "https://i.ibb.co/v6930fz7/MGK09461.jpg",
  "https://i.ibb.co/XfTw291N/MGK09466.jpg",
  "https://i.ibb.co/F4rxyfQs/MGK09469.jpg",
  "https://i.ibb.co/67vHhrxB/MGK09478.jpg",
  "https://i.ibb.co/kVsjmZ0x/MGK09480.jpg",
  "https://i.ibb.co/TBHHTwcv/MGK09491.jpg",
  "https://i.ibb.co/M575ZVxb/MGK09502.jpg",
  "https://i.ibb.co/HcSV53h/MGK09505.jpg",
  "https://i.ibb.co/jZ9xJT3k/MGK09508.jpg",
  "https://i.ibb.co/xqqrhLLS/MGK09511.jpg",
  "https://i.ibb.co/M5VZ4Fgc/MGK09515.jpg",
  "https://i.ibb.co/vRw0nDc/MGK09517.jpg",
  "https://i.ibb.co/6cZhMPb9/MGK09521.jpg",
  "https://i.ibb.co/rKxQ5qRF/MGK09523.jpg",
  "https://i.ibb.co/kgcJwN0F/MGK09529.jpg",
  "https://i.ibb.co/TBhhsjgB/MGK09536.jpg",
  "https://i.ibb.co/svnmm6Ls/MGK09549.jpg",
  "https://i.ibb.co/v6CTF3b6/MGK09552.jpg",
  "https://i.ibb.co/60LTnQr6/MGK09576.jpg",
  "https://i.ibb.co/v4Pct38Y/MGK09581.jpg"
];

export default function PhotoVotingApp() {
  const [name, setName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votes, setVotes] = useState([]);
  const [votingComplete, setVotingComplete] = useState(false);

  const sendVoteToSheet = async (vote) => {
    const photo = photos[currentIndex];
    try {
      await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, photo, vote }),
      });
    } catch (error) {
      console.error("Errore invio voto:", error);
    }
  };

  const handleVote = async (vote) => {
    await sendVoteToSheet(vote);
    setVotes([...votes, { name, photo: photos[currentIndex], vote }]);
    const next = currentIndex + 1;
    if (next < photos.length) {
      setCurrentIndex(next);
    } else {
      setVotingComplete(true);
    }
  };

  if (!name) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>Inserisci il tuo nome</h1>
        <input
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
          placeholder="es. miglio"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    );
  }

  if (votingComplete) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h2 style={{ fontSize: 20 }}>Grazie per aver votato, {name}!</h2>
        <p>I tuoi voti sono stati registrati.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h1 style={{ fontSize: 20, marginBottom: 16 }}>
        Foto {currentIndex + 1} di {photos.length}
      </h1>
      <img
        src={photos[currentIndex]}
        alt={`Foto ${currentIndex + 1}`}
        style={{ maxHeight: 500, marginBottom: 16, borderRadius: 16 }}
      />
      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        <button onClick={() => handleVote("no")}>No</button>
        <button onClick={() => handleVote("yes")}>Sì</button>
      </div>
    </div>
  );
}
