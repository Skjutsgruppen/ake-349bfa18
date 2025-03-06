
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Welcome = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || name.length > 15) {
      toast({
        title: "Fel",
        description: "Vänligen ange ett namn med max 15 tecken",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('userName', name);
    navigate('/chat');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-chatgpt-main p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-gray-700 p-8">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-bold text-white">Hej!</h1>
          <p className="mb-8 text-lg text-gray-300">
            Det här en prototyp av "Åke" - en unik AI-reseplanerare. I det här testscenariot är du medlem i Scouterna, bor i Borås och jobbar på Volvo.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">
              Vilket är ditt förnamn?
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={15}
              placeholder="Ange förnamn"
              className="rounded-xl bg-[#3A3B42] border-gray-700 text-white"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full rounded-xl border border-transparent bg-[#00aeef] py-3 text-white hover:bg-[#0088bb] hover:border-gray-600 transition-all duration-300"
          >
            Testa
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;
