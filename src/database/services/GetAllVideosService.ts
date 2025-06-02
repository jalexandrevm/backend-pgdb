import { myDbSource } from "../db-source";
import { Video } from "../entities/Video";

export class GetAllVideosService {
  async execute() {
    const videoRepository = myDbSource.getRepository(Video);

    try {
      const videos = await videoRepository.find({
        relations: ['category'], // Include category relation
      });
      return videos;
    } catch (error) {
      throw new Error('Erro ao buscar vídeos: ' + error.message);
    }
  }
}
