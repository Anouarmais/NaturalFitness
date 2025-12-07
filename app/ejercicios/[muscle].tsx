import { useLocalSearchParams } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const mainColor = "#FFD700";

export default function MuscleExercisesPage() {
  const { muscle } = useLocalSearchParams();
  const muscleParam = Array.isArray(muscle) ? muscle[0] : muscle;

  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [headerTitle, setHeaderTitle] = useState(muscleParam);

  useEffect(() => {
    if (!muscleParam) return;

    const fetchVideos = async () => {
      try {
        const res = await fetch(`https://r2-list-worker.natural-fitnes.workers.dev/?muscle=${muscleParam}`);
        if (!res.ok) throw new Error("Error fetching videos");
        const data: string[] = await res.json();

        const filtered = data.filter(url => url.toLowerCase().endsWith(".mp4"));
        setVideos(filtered);
      } catch (err) {
        console.error(err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [muscleParam]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00afcb" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}>
      <Text style={styles.header}>
        {headerTitle?.charAt(0).toUpperCase() + headerTitle?.slice(1).toLowerCase()}
      </Text>
      <View style={styles.underline} />

      <FlatList
        data={videos}
        keyExtractor={item => item}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          const decodedUrl = decodeURIComponent(item);
          const fileName = decodedUrl.split("/").pop()?.replace(".mp4", "") || "Video";
          const imageUrl = decodedUrl.replace(".mp4", ".png");

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => {
                setActiveVideo(item);
                setHeaderTitle(fileName);
              }}
            >
              <Image source={{ uri: imageUrl }} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{fileName}</Text>
                <View style={styles.yellowDetail} />
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {activeVideo && <VideoModal uri={activeVideo} onClose={() => setActiveVideo(null)} />}
    </View>
  );
}

function VideoModal({ uri, onClose }: { uri: string; onClose: () => void }) {
  const player = useVideoPlayer(uri);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (!player) return;
    if (closed) return;

    player.play();

    const sub = player.addListener("ended", () => {
      player.seekTo(0);
      player.play();
    });

    return () => {
      sub.remove();
      // NO hacer player.pause() aquí porque puede estar liberado
    };
  }, [player, closed]);

  const handleClose = () => {
    setClosed(true);
    onClose();
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modal}>
        <VideoView
          player={player}
          style={{ width: "100%", height: "100%" }}
          nativeControls
          resizeMode="contain"
            muted={false}
  audioMode={{
    allowsRecordingIOS: false,
    staysActiveInBackground: false,
    playsInSilentModeIOS: true, // 🔹 esto fuerza el audio incluso si el iPhone está en silencio
  }}
        />
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={{ color: "#000", fontSize: 18 }}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "500", color: "#000", marginBottom: 6, paddingTop: 50 },
  underline: { width: 60, height: 3, backgroundColor: mainColor, borderRadius: 2, marginBottom: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    height: 120,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardInfo: { flex: 1, marginLeft: 12, justifyContent: "center" },
  cardTitle: { fontSize: 18, fontWeight: "400", color: "#000" },
  yellowDetail: { width: 40, height: 4, backgroundColor: mainColor, borderRadius: 2, marginTop: 6 },
  cardImage: { width: 110, height: 110, borderRadius: 12 },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    height: "70%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
  },
});
