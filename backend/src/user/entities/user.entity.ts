import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vote } from '../../vote/entities/vote.entity';

export enum UserRole {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Vote, (vote) => vote.voter)
  votes: Vote[];
}
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules

# Expose port for Nginx (if serving static files directly) or Next.js server
EXPOSE 3000
CMD ["npm", "run", "start"]
```

### Step 4: Docker Compose File (Re-creation for completeness)

I will ensure the `docker-compose.yml` is present and correct, as it ties everything together.

```tool
TOOL_NAME: edit_existing_file
BEGIN_ARG: filepath
"docker-compose.yml"