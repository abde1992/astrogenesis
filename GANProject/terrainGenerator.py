import torch
from torchvision import transforms
from torch.autograd import Variable

def generate_terrain():
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    model = torch.load('./models/terrainModel.pth')
    model = model.to(device)
    model.eval()

    z = Variable(torch.randn(1, 100, 1, 1).to(device))  # A random noise vector
    output = model(z)

    # Transpose the tensor to match the format required by Three.js
    output = output.permute(1, 2, 0).detach().cpu().numpy().tolist()

    # The output is normalized between -1 and 1
    output = [[(y * 0.5 + 0.5) * 10 for y in x] for x in output] 

    return output
