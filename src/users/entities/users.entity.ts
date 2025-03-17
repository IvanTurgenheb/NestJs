import { Column, Entity, OneToMany } from 'typeorm';
import { RoleEnum } from '../const/roles.const';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { BaseModel } from 'src/common/entities/base.entity';

@Entity()
export class UsersModel extends BaseModel {
  @Column({
    unique: true,
    length: 20,
  })
  nickname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    enum: Object.values(RoleEnum),
    default: RoleEnum.USER,
  })
  role: RoleEnum;

  // 한 명의 사용자는 여러개의 포스트를 작성할 수 있음
  @OneToMany(() => PostsModel, (post) => post.author) // One
  posts: PostsModel[]; // Many
}
