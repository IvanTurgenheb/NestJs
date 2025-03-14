import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Injectable()
export class PostsService {
  // 객체 지향 프로그래밍에서 객체를 생성할 때 초기화하는 함수를 의미합니다.
  constructor(
    @InjectRepository(PostsModel)
    private readonly postRepository: Repository<PostsModel>,
  ) {}

  async getPosts() {
    return this.postRepository.find({
      relations: ['author'],
    }); // repository 함수는 기본적으로 비동기이다.
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) throw new NotFoundException();

    return post;
  }

  async createPost(authorId: number, title: string, content: string) {
    if (!authorId || !title || !content) {
      throw new BadRequestException('입력값이 충분하지 않습니다.', {
        cause: new Error(),
        description: '입력값을 완전히 입력해주세요.',
      });
    }

    const newPost = this.postRepository.create({
      author: {
        id: authorId, // ManyToOne 관계를 어떤식으로 만들지 나타냄 (id를 통해 ManyToOne 관계를 나타냄)
      },
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    await this.postRepository.save(newPost);
    return newPost;
  }

  async modifyPost(id: number, title?: string, content?: string) {
    const findPost = await this.postRepository.findOne({ where: { id } });

    if (!findPost) {
      throw new NotFoundException();
    }

    const updatePost = {
      ...findPost,
      title: title || findPost.title,
      content: content || findPost.content,
    };

    await this.postRepository.save(updatePost);

    return updatePost;
  }

  async deletePost(id: number) {
    const findPost = await this.postRepository.findOne({ where: { id } });

    if (!findPost) {
      throw new NotFoundException();
    }

    await this.postRepository.delete(id);

    return `${id}번 게시글이 삭제되었어요.`;
  }
}
