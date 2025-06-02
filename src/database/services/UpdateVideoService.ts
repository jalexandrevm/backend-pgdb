import { myDbSource } from "../db-source";
import { Video } from "../entities/Video";

export class UpdateVideoService {
  async execute(id: string, name: string, description: string, duration: number, category_id: string): Promise<void> {
    const videoRepository = myDbSource.getRepository(Video);

    // Check if the video exists
    const video = await videoRepository.findOneBy({ id });
    if (!video) {
      throw new Error('Vídeo não encontrado');
    }

    // Update the video properties
    if (video.name !== name) {
      video.name = name;
    }
    if (video.description !== description) {
      video.description = description;
    }
    if (video.duration !== duration) {
      video.duration = duration;
    }
    if (video.category_id !== category_id) {
      video.category_id = category_id;
    }
    video.updated_at = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })); // Update the timestamp

    // Save the updated video
    await videoRepository.save(video);
  }
}
