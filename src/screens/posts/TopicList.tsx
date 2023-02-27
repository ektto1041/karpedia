import Topic from "./Topic";

export type TopicListProps = {
  topics: string[],
  selectedTopics: string[],
  onClickTopic: (topicName: string) => void,
};

export default function TopicList({
  topics,
  selectedTopics,
  onClickTopic,
} : TopicListProps) {
  return (
    <>
      {topics.map(topic => (
        <Topic key={topic} selected={selectedTopics.includes(topic)} onClick={onClickTopic}>{topic}</Topic>
      ))}
    </>
  );
};