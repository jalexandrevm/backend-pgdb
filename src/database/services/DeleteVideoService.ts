import { myDbSource } from "../db-source";
import { Video } from "../entities/Video";

export class DeleteVideoService {
  async execute(id: string): Promise<void> {
    const videoRepository = myDbSource.getRepository(Video);

    // Check if the video exists
    const video = await videoRepository.findOneBy({ id });
    if (!video) {
      throw new Error('Vídeo não encontrado');
    }

    // Delete the video
    await videoRepository.remove(video);
  }
}
