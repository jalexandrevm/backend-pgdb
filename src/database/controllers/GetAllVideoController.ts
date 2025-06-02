import { GetAllVideosService } from "../services/GetAllVideosService";

export class GetAllVideoController {
  async handle(request: any, response: any) {
    const getAllVideosService = new GetAllVideosService();

    try {
      const videos = await getAllVideosService.execute();
      return response.status(200).json(videos);
    } catch (err) {
      return response.status(500).json({ error: `Erro ao buscar vídeos`, details: err.message });
    }
  }
}
