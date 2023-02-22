import type { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';
import db, { ErrorRes, Post, PostData } from '@/utils/db';
import strings from '@/utils/strings';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | ErrorRes>
) {
  switch(req.method) {
    case 'POST':
      const newPostData: PostData = req.body;

      const newPost: Post = {
        emoji: newPostData.emoji,
        title: newPostData.title,
        content: newPostData.content,
        topics: [], // topic 의 ID 를 배열로 저장
        createdAt: dayjs().format(),
        modifiedAt: dayjs().format(),
      }

      try {
        const topicsInDB: QueryDocumentSnapshot<DocumentData>[] = [];
        const allTopics = await db.getAllTopics();
        allTopics.forEach(doc => topicsInDB.push(doc));

        // newPostData 로 전달된 topic 들을 하나씩 DB 에 있는 topic 과 비교하여
        // topic 이 DB에 존재하면, 그 topic 의 id 를 newPost.topics 에 push
        // topic 이 DB에 없으면,  새 topic 을 DB 에 추가하고, 그 id 를 newPost.topics 에 push
        for(const topic of newPostData.topics) {
          const foundTopic = topicsInDB.find(t => t.data().name === topic);
          const hasTopicInDB = foundTopic?.data.name;
          if(!hasTopicInDB) {
            const addedTopic = await db.addTopic({ name: topic });
            newPost.topics.push(addedTopic.id);
          } else {
            newPost.topics.push(foundTopic.id);
          }
        }

        await db.addPost(newPost);

        res.status(200).json(newPost);
      } catch(e) {
        res.status(400).json({
          message: strings.db.err.unknown,
        });
      }
    default:
  }
}
