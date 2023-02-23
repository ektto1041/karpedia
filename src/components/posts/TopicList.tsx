import Topic from "./Topic";

export type TopicListProps = {
  topics: string[],
};

export default function TopicList({
  topics,
} : TopicListProps) {
  return (
    <>
      {topics.map(topic => (
        <Topic>{topic}</Topic>
      ))}
    </>
  );
};