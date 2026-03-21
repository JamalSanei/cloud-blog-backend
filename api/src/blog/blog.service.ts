import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  private readonly logger = new Logger(BlogService.name);
  async create(data) {
    const blog = this.blogRepository.create(data);
    this.logger.log('Creating blog: ', blog);
    return this.blogRepository.save(blog);
  }
}
