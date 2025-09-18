import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { handleSocialShare } from '@/lib/utils';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
}

export function ShareDialog({ open, onOpenChange, imageUrl }: ShareDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Design</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center p-4 h-auto"
            onClick={() => handleSocialShare('facebook', imageUrl)}
          >
            <Facebook className="h-8 w-8 mb-2 text-blue-600" />
            <span className="text-xs">Facebook</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center p-4 h-auto"
            onClick={() => handleSocialShare('twitter', imageUrl)}
          >
            <Twitter className="h-8 w-8 mb-2 text-sky-500" />
            <span className="text-xs">Twitter</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center p-4 h-auto"
            onClick={() => handleSocialShare('pinterest', imageUrl)}
          >
            <svg className="h-8 w-8 mb-2 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
            </svg>
            <span className="text-xs">Pinterest</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center p-4 h-auto"
            onClick={() => handleSocialShare('instagram', imageUrl)}
          >
            <Instagram className="h-8 w-8 mb-2 text-pink-600" />
            <span className="text-xs">Instagram</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 