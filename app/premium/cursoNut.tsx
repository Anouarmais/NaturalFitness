import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Linking, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const mainColor = "#FFD700";

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
`;

const Header = styled.View`
  width: 100%;
  margin-top: 35px;
  margin-bottom: 25px;
`;

const HeaderTop = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleHeader = styled.Text`
  font-size: 22px;
  font-family: "Poppins_700Bold";
  color: #222;
  margin-left: 10px;
`;

const Underline = styled.View`
  width: 60px;
  height: 3px;
  background-color: ${mainColor};
  border-radius: 2px;
  margin-top: 6px;
  margin-left: 36px;
`;

const Card = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 18px;
  margin-bottom: 20px;
  overflow: hidden;
  elevation: 3;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.05);
`;

const Thumbnail = styled.Image`
  width: 100%;
  height: 180px;
`;

const Info = styled.View`
  padding: 14px 16px;
`;

const VideoTitle = styled.Text`
  font-family: "Poppins_700Bold";
  font-size: 17px;
  color: #000;
`;

const SubText = styled.Text`
  font-family: "Poppins_400Regular";
  font-size: 14px;
  color: #777;
  margin-top: 4px;
`;

function extractYouTubeId(url: string): string {
  const m = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\b|&|$)/);
  return m ? m[1] : "";
}

async function fetchOEmbedTitle(youtubeUrl: string): Promise<string | null> {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      youtubeUrl
    )}&format=json`;
    const res = await fetch(oembedUrl);
    if (!res.ok) return null;
    const json = await res.json();
    return json.title ?? null;
  } catch (e) {
    return null;
  }
}

export default function Ejercicio() {
  const router = useRouter();

  const links = [
    "https://www.youtube.com/watch?v=uFeqNVfU4Q4&t=1s",
    "https://www.youtube.com/watch?v=wSl272hi1AM",
    "https://www.youtube.com/watch?v=UFGSzN3HSFo",
    "https://www.youtube.com/watch?v=--PndKI14HU",
    "https://www.youtube.com/watch?v=h9KqsxUI7lY",
    "https://www.youtube.com/watch?v=_Aj-TYf-u-0",
    "https://www.youtube.com/watch?v=Pe-xI7O5M40",
    "https://www.youtube.com/watch?v=KevmlOYteTM",
    "https://www.youtube.com/watch?v=Pa93w-Emypo",
    "https://www.youtube.com/watch?v=poRId80xn5E",
    "https://www.youtube.com/watch?v=El73AfD9OgA",
    "https://www.youtube.com/watch?v=UEea2GbUvWc",
    "https://www.youtube.com/watch?v=3LRZ0TCYwgs",
    "https://www.youtube.com/watch?v=fMv7f9vYO30",
    "https://www.youtube.com/watch?v=JgN0S1Qoyn0",
    "https://www.youtube.com/watch?v=QgCrI-l83xc",
    "https://www.youtube.com/watch?v=DAHorMoDhOA",
  ];

  const [videos, setVideos] = useState<
    { id: number; url: string; title: string; thumbnail: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const temp: any[] = [];
      for (let i = 0; i < links.length; i++) {
        const url = links[i];
        const id = extractYouTubeId(url);
        const title = (await fetchOEmbedTitle(url)) || "Video de YouTube";
        const thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        temp.push({ id: i + 1, url, title, thumbnail });
      }
      if (mounted) {
        setVideos(temp);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTop>
          <TouchableOpacity onPress={() => router.push("/premium" as any)}>
            <Ionicons name="arrow-back" size={26} color="#000" />
          </TouchableOpacity>
          <TitleHeader>Ejercicio</TitleHeader>
        </HeaderTop>
        <Underline />
      </Header>

      {loading ? (
        <ActivityIndicator size="large" color={mainColor} />
      ) : (
        videos.map((v) => (
          <Card key={v.id} activeOpacity={0.9} onPress={() => Linking.openURL(v.url)}>
            <Thumbnail source={{ uri: v.thumbnail }} resizeMode="cover" />
            <Info>
              <VideoTitle>{v.title}</VideoTitle>
              <SubText>Video {v.id}</SubText>
            </Info>
          </Card>
        ))
      )}
    </Container>
  );
}
