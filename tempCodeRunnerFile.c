#include<stdio.h>
int main()

{
	int i_num_primi=0;
	int n=1;
	int k=1;
	int conta_divisori=0;

	while(i_num_primi<9999)
	{
		n++;
		k=n;
			while (k>0)
				{
					if (n%k==0)
					conta_divisori++;
				k--;
				}
		if (conta_divisori==2)
		i_num_primi++;
		conta_divisori=0;
	
	}
printf("Il centesimo numero primo corrisponde  a: %d", n);

return 0;
}