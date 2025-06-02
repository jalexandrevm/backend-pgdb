import { myDbSource } from '../db-source';
import { Status } from '../entities/Status';

export class CreateStatusService {
  async execute(data: Partial<Status>): Promise<Status> {
    const statusRepository = myDbSource.getRepository(Status);
    const status = statusRepository.create(data);
    await statusRepository.save(status);
    return status;
  }
}

export class GetAllStatusService {
  async execute(): Promise<Status[]> {
    return myDbSource.getRepository(Status).find();
  }
}

export class GetStatusByCodigoService {
  async execute(codigo: string): Promise<Status | null> {
    return myDbSource.getRepository(Status).findOneBy({ codigo });
  }
}

export class UpdateStatusService {
  async execute(codigo: string, data: Partial<Status>): Promise<Status | null> {
    const repo = myDbSource.getRepository(Status);
    const status = await repo.findOneBy({ codigo });
    if (!status) return null;
    Object.assign(status, data);
    await repo.save(status);
    return status;
  }
}

export class DeleteStatusService {
  async execute(codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(Status);
    const result = await repo.delete({ codigo });
    return result.affected !== 0;
  }
}
