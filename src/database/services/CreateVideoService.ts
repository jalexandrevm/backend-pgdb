import { myDbSource } from "../db-source";
import { Category } from "../entities/Category";
import { Video } from "../entities/Video";
import { v4 as uuidv4 } from 'uuid';

export class CreateVideoService {
  async execute(
    id: string,
    name: string,
    description: string,
    category_id: string,
    duration: number,
  ): Promise<Video> {
    if (id === "") {
      id = uuidv4(); // Generate a new UUID if id is not provided
    }
    const categoryRepository = myDbSource.getRepository(Category);
    const categoryExists = await categoryRepository.findOneBy({ id: category_id });
    if (!categoryExists) {
      throw new Error('Categoria não existe');
    }

    const videoRepository = myDbSource.getRepository(Video);
    // Check if the video id already exists
    const videoIdExists = await videoRepository.findOneBy({ id });
    if (videoIdExists) {
      throw new Error('Id do Vídeo já existe');
    }
    // Check if the video name already exists
    const videoNameExists = await videoRepository.findOneBy({ name });
    if (videoNameExists) {
      throw new Error('Título do Vídeo já existe');
    }

    const video = videoRepository.create({ id, name, description, category_id, duration });
    await videoRepository.save(video);

    return video;
  }
}
