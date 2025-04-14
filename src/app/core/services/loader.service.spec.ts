import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    service = new LoaderService();
  });

  it('should initially emit false', (done) => {
    service.loading$.subscribe((value) => {
      expect(value).toBe(false);
      done();
    });
  });

  it('should emit true when show() is called', (done) => {
    const emitted: boolean[] = [];

    service.loading$.subscribe((value) => {
      emitted.push(value);
      if (emitted.length === 2) {
        expect(emitted[1]).toBe(true);
        done();
      }
    });

    service.show();
  });

  it('should emit false when hide() is called after show()', (done) => {
    const emitted: boolean[] = [];

    service.loading$.subscribe((value) => {
      emitted.push(value);
      if (emitted.length === 3) {
        expect(emitted).toEqual([false, true, false]);
        done();
      }
    });

    service.show();
    service.hide();
  });
});
